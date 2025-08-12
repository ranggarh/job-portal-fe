<template>
  <div class="max-w-3xl mx-auto py-12">
    <button @click="$router.back()" class="mb-4 text-blue-500 cursor-pointer">&larr; Back</button>
    <div v-if="job">
      <h1 class="text-3xl font-bold mb-2">{{ job.title }}</h1>
      <p class="text-gray-600 mb-4">{{ job.company_name }}</p>
      <div class="mb-4">{{ job.description }}</div>
      <div class="mb-4">Salary: {{ job.salary_range }}</div>
      <div class="mb-4">Category: {{ job.category }}</div>
      <div class="mb-4">Location: {{ job.location }}</div>
      <div class="mb-4">Requirements: {{ job.requirements }}</div>
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        @click="handleApply"
      >
        Apply Now
      </button>
    </div>
    <div v-else class="text-center text-gray-500">Loading job details...</div>
  </div>
</template>

<script>
import api from "../api/index.js";
export default {
  name: "JobDetail",
  data() {
    return {
      job: null,
      loading: true
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
        this.$router.push("/login");
      } else {
        this.$router.push({ name: "Apply", params: { id: this.job.id } });
      }
    }
  }
};
</script>