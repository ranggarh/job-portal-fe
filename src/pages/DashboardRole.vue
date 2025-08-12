<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Role Management</h2>
      <button @click="openAdd" class="bg-blue-500 text-white px-4 py-2 rounded">+ Add Role</button>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="roles"
      :search-options="{ enabled: true }"
    >
      <template #table-row="props">
        <span v-if="props.column.field === 'actions'">
          <button @click="openEdit(props.row)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
          <button @click="deleteRole(props.row.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <!-- Modal/Form Add/Edit Role -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button @click="closeForm" class="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600">&times;</button>
        <h2 class="text-lg font-semibold mb-4">{{ isEdit ? 'Edit Role' : 'Add Role' }}</h2>
        <form @submit.prevent="saveRole">
          <input v-model="form.name" type="text" placeholder="Role Name" class="border p-2 w-full mb-3" required />
          <textarea v-model="form.description" placeholder="Description" class="border p-2 w-full mb-3" required></textarea>
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
      roles: [],
      showForm: false,
      isEdit: false,
      form: {
        id: null,
        name: "",
        description: ""
      }
    };
  },
  computed: {
    columns() {
      return [
        { label: "Role Name", field: "name" },
        { label: "Description", field: "description" },
        { label: "Actions", field: "actions", sortable: false }
      ];
    }
  },
  async mounted() {
    await this.fetchRoles();
  },
  methods: {
    async fetchRoles() {
      const res = await api.get("/roles");
      this.roles = res.data.data;
    },
    openAdd() {
      this.isEdit = false;
      this.form = { id: null, name: "", description: "" };
      this.showForm = true;
    },
    openEdit(role) {
      this.isEdit = true;
      this.form = { id: role.id, name: role.name, description: role.description };
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    async saveRole() {
      try {
        if (this.isEdit && this.form.id) {
          await api.put(`/roles/${this.form.id}`, this.form);
        } else {
          await api.post("/roles", this.form);
        }
        this.showForm = false;
        await this.fetchRoles();
      } catch (e) {
        // handle error
      }
    },
    async deleteRole(id) {
      if (confirm("Delete this role?")) {
        await api.delete(`/roles/${id}`);
        await this.fetchRoles();
      }
    }
  }
};
</script>