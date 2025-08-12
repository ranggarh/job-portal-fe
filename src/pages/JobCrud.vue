<template>
  <div class="p-4">
    <JobTable :jobs="jobs" @add-job="openAddForm" @edit-job="openEditForm" @delete-job="deleteJob" />
    <JobForm v-if="showForm" :isEdit="isEdit" :form="form" @save-job="saveJob" @cancel="closeForm" />
  </div>
</template>

<script>
import JobTable from "../components/JobTable.vue";
import JobForm from "../components/JobForm.vue";
import api from "../api/index.js";

export default {
  components: { JobTable, JobForm },
  data() {
    return {
      jobs: [],
      showForm: false,
      isEdit: false,
      form: { id: null, title: "", company_name: "", salary: "", description: "" }
    }
  },
  async mounted() {
    await this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      const res = await api.get("/job-listings");
      this.jobs = res.data.data;
    },
    openAddForm() {
      this.isEdit = false;
      this.form = { id: null, title: "", company_name: "", salary: "", description: "" };
      this.showForm = true;
    },
    openEditForm(job) {
      this.isEdit = true;
      this.form = { ...job };
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    async saveJob(form) {
      if (this.isEdit) {
        await api.put(`/job-listings/${form.id}`, form);
      } else {
        await api.post("/job-listings", form);
      }
      await this.fetchJobs();
      this.closeForm();
    },
    async deleteJob(id) {
      await api.delete(`/job-listings/${id}`);
      await this.fetchJobs();
    }
  }
}
</script>
