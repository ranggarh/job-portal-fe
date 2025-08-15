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
      <div class="text-white p-8">
        <div class="flex items-center gap-6 mb-6">
          <div class="bg-white p-3 rounded-lg">
            <img
              :src="job.image_path || '/failed-image.jpg'"
              :alt="job.company_name"
              @error="handleImageError"
              class="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 class="text-3xl font-bold mb-2 text-gray-800">
              {{ job.title }}
            </h1>
            <p class="text-gray-300 text-lg text-gray-600">
              {{ job.company_name }}
            </p>
          </div>
        </div>

        <div class="flex gap-4 mt-4">
          <div class="flex items-center gap-2">
            <span class="bg-gray-700 px-4 py-2 rounded-full text-sm">
              💰 {{ job.salary_range }}
            </span>
            <span class="bg-gray-700 px-4 py-2 rounded-full text-sm">
              📍 {{ job.location }}
            </span>
            <span class="bg-gray-700 px-4 py-2 rounded-full text-sm">
              🏢 {{ job.category }}
            </span>
          </div>
        </div>
      </div>
      <hr class="border-gray-500 mx-7" />
      <!-- Content Section -->
      <div class="p-8">
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">
            Job Description
          </h2>
          <p class="text-gray-600 leading-relaxed">{{ job.description }}</p>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Requirements</h2>
          <div class="text-gray-600 leading-relaxed">
            {{ job.requirements }}
          </div>
        </div>

        <button
          @click="handleApply"
          class="w-full bg-gray-800 text-white py-4 px-6 rounded-lg hover:bg-gray-900 transition-colors duration-300 font-medium text-lg cursor-pointer"
        >
          Apply for this position
        </button>
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
import Swal from 'sweetalert2';

export default {
  name: "JobDetail",
  data() {
    return {
      job: null,
      loading: true,
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/job-listings/${id}`);
      if (res.data.status === 200) {
        this.job = res.data.data;
      }
    } catch (e) {
      this.job = null;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    handleApply() {
      const user = localStorage.getItem("user");
      if (!user) {
        Swal.fire({
          title: "Authentication Required",
          text: "Please login first to apply for this job",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#1f2937", // bg-gray-800
          cancelButtonColor: "#6b7280", // bg-gray-500
          confirmButtonText: "Login Now",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$router.push("/login");
          }
        });
      } else {
        this.$router.push({ name: "Apply", params: { id: this.job.id } });
      }
    },
    handleImageError(e) {
      e.target.src = "/failed-image.jpg";
    },
  },
};
</script>
