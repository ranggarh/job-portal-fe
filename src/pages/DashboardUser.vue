<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">User Management</h2>
      <button @click="openAdd" class="bg-blue-500 text-white px-4 py-2 rounded">+ Add User</button>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="users"
      :search-options="{ enabled: true }"
    >
      <template #table-row="props">
        <span v-if="props.column.field === 'actions'">
          <button @click="openEdit(props.row)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
          <button @click="deleteUser(props.row.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </span>
        <span v-else-if="props.column.field === 'is_active'">
          <span :class="props.row.is_active ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
            {{ props.row.is_active ? 'Active' : 'Inactive' }}
          </span>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <!-- Modal/Form Add/Edit User -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button @click="closeForm" class="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600">&times;</button>
        <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Edit User' : 'Add User' }}</h2>
        <form @submit.prevent="saveUser">
          <input v-model="form.name" type="text" placeholder="Name" class="border p-2 w-full mb-3" required />
          <input v-model="form.email" type="email" placeholder="Email" class="border p-2 w-full mb-3" required />
          <input v-if="!isEdit" v-model="form.password" type="password" placeholder="Password" class="border p-2 w-full mb-3" required />
          <input v-else v-model="form.password" type="password" placeholder="Password (leave blank to keep current)" class="border p-2 w-full mb-3" />
          <select v-model="form.role_id" class="border p-2 w-full mb-3" required>
            <option disabled value="">Select Role</option>
            <option value="1">Administrator</option>
            <option value="2">Employer</option>
            <option value="3">Job Seeker</option>
          </select>
          <div class="flex items-center mb-3">
            <input
              id="is_active"
              type="checkbox"
              v-model="form.is_active"
              true-value="1"
              false-value="0"
              class="mr-2"
            />
            <label for="is_active">Active</label>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="closeForm" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';
import api from "../api/index.js";

export default {
  components: { VueGoodTable },
  data() {
    return {
      users: [],
      showForm: false,
      isEdit: false,
      form: {
        id: null,
        name: "",
        email: "",
        password: "",
        role_id: "",
        is_active: "1"
      }
    };
  },
  computed: {
    columns() {
      return [
        { label: "Name", field: "name" },
        { label: "Email", field: "email" },
        { label: "Role", field: "role_id" },
        { label: "Status", field: "is_active" },
        { label: "Actions", field: "actions", sortable: false }
      ];
    }
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const res = await api.get("/users");
      this.users = res.data.data;
    },
    openAdd() {
      this.isEdit = false;
      this.form = {
        id: null,
        name: "",
        email: "",
        password: "",
        role_id: "",
        is_active: "1"
      };
      this.showForm = true;
    },
    openEdit(user) {
      this.isEdit = true;
      this.form = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
        role_id: user.role_id,
        is_active: user.is_active ? "1" : "0"
      };
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    async saveUser() {
      try {
        if (this.isEdit && this.form.id) {
          // Edit user (PUT)
          const payload = { ...this.form };
          if (!payload.password) delete payload.password; // Jangan kirim password jika kosong
          await api.put(`/users/${this.form.id}`, payload);
        } else {
          // Add user (POST)
          await api.post("/users", this.form);
        }
        this.showForm = false;
        await this.fetchUsers();
      } catch (e) {
        // handle error (misal tampilkan pesan)
      }
    },
    async deleteUser(id) {
      if (confirm("Delete this user?")) {
        await api.delete(`/users/${id}`);
        await this.fetchUsers();
      }
    }
  }
};
</script>