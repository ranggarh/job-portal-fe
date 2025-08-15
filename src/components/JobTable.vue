<template>
  <div class="bg-white p-4 rounded shadow">
    
    <vue-good-table
      :columns="columns"
      :rows="jobs"
      :search-options="{ enabled: true }"
    >
      <template #table-row="props">
        <span v-if="props.column.field === 'actions'">
          <button @click="$emit('edit-job', props.row)" class="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer">Edit</button>
          <button @click="$emit('delete-job', props.row.id)" class="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">Delete</button>
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
  </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

export default {
  components: { VueGoodTable },
  props: ["jobs"],
  computed: {
    columns() {
      return [
        { label: "#", field: "index", sortable: false },
        { label: "Title", field: "title" },
        { label: "Company", field: "company_name" },
        { label: "Description", field: "description" },
        { label: "Location", field: "location" },
        { label: "Salary", field: "salary_range" },
        { label: "Requirements", field: "requirements" },
        { label: "Status", field: "is_active" },
        { label: "Actions", field: "actions", sortable: false }
      ];
    }
  }
};
</script>