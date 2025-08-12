<template>
  <div>
    <div v-if="loading" class="text-center py-8 text-gray-500">Loading...</div>
    <JobTable
      v-else
      :jobs="jobs"
      @add-job="openAdd"
      @edit-job="openEdit"
      @delete-job="deleteJob"
    />
    <SlideOverPanel :show="showForm" @close="closeForm">
      <JobForm
        :isEdit="isEdit"
        :form="form"
        @save-job="saveJob"
        @cancel="closeForm"
      />
    </SlideOverPanel>
  </div>
</template>

<script>
import JobTable from "../components/JobTable.vue";
import JobForm from "../components/JobForm.vue";
import SlideOverPanel from "../components/SlideOverPanel.vue";
import api from "../api/index.js";

export default {
  components: { JobTable, JobForm, SlideOverPanel },
  data() {
    return {
      jobs: [],
      loading: true,
      showForm: false,
      isEdit: false,
      form: {
        id: null,
        title: "",
        company_name: "",
        salary: "",
        description: ""
      }
    };
  },
  async mounted() {
    await this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
        this.loading = true;
        try {
        const res = await api.get("/job-listings");
        if (res.data.status === 200) {
            this.jobs = res.data.data;
        }
        } catch (e) {
        // handle error
        } finally {
        this.loading = false;
        }
    },
    openAdd() {
        this.isEdit = false;
        this.form = {
        id: null,
        title: "",
        company_name: "",
        salary: "",
        description: ""
        };
        this.showForm = true;
    },
    openEdit(job) {
        this.isEdit = true;
        this.form = { ...job };
        this.showForm = true;
    },
    closeForm() {
        this.showForm = false;
    },
    async saveJob(formData) {
        try {
            if (this.isEdit && this.form.id) {
            // Edit job
            formData.append('_method', 'PUT');
            await api.post(`/job-listings/${this.form.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            } else {
            // Add job
            await api.post("/job-listings", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            }
            this.showForm = false;
            await this.fetchJobs();
        } catch (e) {
            // handle error
        }
    },
    async deleteJob(id) {
        if (confirm("Are you sure you want to delete this job?")) {
        try {
            await api.delete(`/job-listings/${id}`);
            await this.fetchJobs(); // refresh data setelah hapus
        } catch (e) {
            // handle error (misal tampilkan pesan gagal)
        }
    }
    }
}
};
</script>