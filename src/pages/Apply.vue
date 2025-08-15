<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <button
      @click="$router.back()"
      class="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors cursor-pointer"
    >
      <span class="text-2xl">&larr;</span>
      <span>Back</span>
    </button>

    <div v-if="job" class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Header Section -->
      <div class="p-8">
        <div class="flex items-center gap-6 mb-6">
          <div class="bg-gray-100 p-3 rounded-lg">
            <img
              :src="job.image_path || '/failed-image.jpg'"
              :alt="job.company_name"
              @error="handleImageError"
              class="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 class="text-3xl font-bold mb-2 text-gray-800">
              Apply for {{ job.title }}
            </h1>
            <p class="text-gray-600 text-lg">
              {{ job.company_name }}
            </p>
          </div>
        </div>
      </div>

      <hr class="border-gray-200 mx-7" />

      <!-- Application Form Section -->
      <div class="p-8">
        <form
          @submit.prevent="submitApplication"
          enctype="multipart/form-data"
          class="space-y-6"
        >
          <div>
            <label class="block text-gray-800 font-semibold mb-3"
              >Cover Letter</label
            >
            <textarea
              v-model="cover_letter"
              class="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-all"
              rows="6"
              placeholder="Tell us why you're perfect for this role..."
            ></textarea>
          </div>

          <div>
            <label class="block text-gray-800 font-semibold mb-3">
              Upload CV
              <span class="text-sm font-normal text-gray-500 ml-2">
                (PDF/DOC, max 2MB)
              </span>
            </label>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
            >
              <input
                type="file"
                @change="onFileChange"
                accept=".pdf,.doc,.docx"
                class="hidden"
                id="cv-upload"
              />
              <label
                for="cv-upload"
                class="cursor-pointer text-gray-600 hover:text-gray-800"
              >
                <span class="block mb-2">Click to upload your CV</span>
                <span class="text-sm text-gray-500">
                  {{ cv ? cv.name : "No file selected" }}
                </span>
              </label>
            </div>
          </div>

          <div v-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 text-green-600 p-4 rounded-lg">
            {{ success }}
          </div>

          <button
            type="submit"
            class="w-full bg-gray-800 text-white py-4 px-6 rounded-lg hover:bg-gray-900 transition-colors duration-300 font-medium text-lg cursor-pointer"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>

    <div
      v-else
      class="text-center py-12 text-gray-500 flex items-center justify-center gap-3"
    >
      <svg
        class="animate-spin h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Loading job details...
    </div>
  </div>
</template>

<script>
import api from "../api/index.js";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      job: null,
      cover_letter: "",
      cv: null,
      error: "",
      success: "",
    };
  },
  async created() {
    // Ambil job berdasarkan id dari route
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/job-listings/${id}`);
      if (res.data.status === 200) {
        this.job = res.data.data;
      } else {
        this.error = "Gagal mengambil data pekerjaan.";
      }
    } catch (e) {
      this.error = "Gagal mengambil data pekerjaan.";
    }
  },
  methods: {
    onFileChange(e) {
      this.cv = e.target.files[0];
    },
    async submitApplication() {
      this.error = "";
      this.success = "";
      const user = JSON.parse(localStorage.getItem("user"));

      if (!this.job) {
        this.error = "Data pekerjaan tidak ditemukan.";
        return;
      }

      // Check for existing application
      const appliedJobs = JSON.parse(
        localStorage.getItem("applied_jobs") || "[]"
      );
      const alreadyApplied = appliedJobs.some(
        (application) =>
          application.user_id === user.id && application.job_id === this.job.id
      );

      if (alreadyApplied) {
        this.error = "Anda sudah pernah melamar pekerjaan ini.";
        return;
      }

      const formData = new FormData();
      formData.append("job_listing_id", this.job.id);
      formData.append("user_id", user.id);
      if (this.cover_letter) formData.append("cover_letter", this.cover_letter);
      if (this.cv) formData.append("cv", this.cv);

      try {
        const res = await api.post("/applications", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.status === 200) {
          let applied = JSON.parse(
            localStorage.getItem("applied_jobs") || "[]"
          );
          applied.push({
            user_id: user.id,
            job_id: this.job.id,
            applied_at: new Date().toISOString(),
          });
          localStorage.setItem("applied_jobs", JSON.stringify(applied));

          // Show success sweet alert
          await Swal.fire({
            title: "Application Submitted!",
            text: "Your job application has been successfully submitted.",
            icon: "success",
            confirmButtonColor: "#1f2937", // bg-gray-800
            confirmButtonText: "OK",
          });

          // Redirect after alert is closed
          this.$router.push("/");
        } else {
          this.error = res.data.message || "Gagal mengirim lamaran.";
        }
      } catch (e) {
        this.error = "Gagal mengirim lamaran.";
      }
    },
  },
};
</script>
