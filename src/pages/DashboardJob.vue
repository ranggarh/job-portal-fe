<template>
  <div>
    <div class="flex justify-between items-center mx-4 mt-4">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold">Job Listings</h2>
          <button
            @click="exportExcel"
            class="bg-green-600 text-white px-4 py-2 rounded"
          >
            Export Excel
          </button>
          <label
            class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Import Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              @change="onChooseFile"
              class="hidden"
            />
          </label>
        </div>
      </div>
      <button @click="openAdd" class="bg-blue-500 text-white px-4 py-2 rounded">
        + Add Job
      </button>
    </div>
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
    <!-- Panel konfirmasi import -->
    <SlideOverPanel :show="showImportConfirm" @close="closeImportConfirm">
      <div class="p-6">
        <h2 class="text-lg font-bold mb-4">Konfirmasi Import Excel</h2>
        <p class="mb-4">
          Anda yakin ingin mengimport file <b>{{ importFile?.name }}</b
          >?
        </p>
        <div class="flex justify-end gap-2">
          <button
            @click="closeImportConfirm"
            class="px-4 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="confirmImport"
            class="px-4 py-2 rounded bg-blue-600 text-white"
          >
            OK
          </button>
        </div>
      </div>
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
      showImportConfirm: false, // <-- untuk panel konfirmasi import
      importFile: null, // <-- untuk menyimpan file yang dipilih
      form: {
        id: null,
        title: "",
        company_name: "",
        salary: "",
        description: "",
      },
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
        description: "",
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
          formData.append("_method", "PUT");
          await api.post(`/job-listings/${this.form.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          // Add job
          await api.post("/job-listings", formData, {
            headers: { "Content-Type": "multipart/form-data" },
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
          await this.fetchJobs();
        } catch (e) {
          // handle error
        }
      }
    },
    async exportExcel() {
      try {
        await api.post("/job-listings/export-excel");
        alert(
          "Export sedang diproses. Silakan cek halaman download jika sudah selesai."
        );
      } catch (e) {
        alert("Export gagal!");
      }
    },
    // Handler saat file dipilih
    onChooseFile(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.importFile = file;
      this.showImportConfirm = true;
      // Reset input supaya bisa pilih file yang sama lagi jika dibatalkan
      e.target.value = "";
    },
    // Konfirmasi OK import
    async confirmImport() {
      if (!this.importFile) return;
      const formData = new FormData();
      formData.append("file", this.importFile);
      try {
        await api.post("/job-listings/import-excel", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Import berhasil! Data akan segera diproses.");
        await this.fetchJobs();
      } catch (e) {
        alert("Import gagal!");
      } finally {
        this.closeImportConfirm();
      }
    },
    // Tutup panel konfirmasi import
    closeImportConfirm() {
      this.showImportConfirm = false;
      this.importFile = null;
    },
  },
};
</script>
