<template>
  <div class="border rounded-lg p-4 hover:shadow-lg">
    <div class="flex items-center gap-4">
      <img :src="job.image_path" alt="logo" class="w-12 h-12 rounded" />
      <div>
        <h3 class="font-semibold">{{ job.company_name }}</h3>
        <p class="text-sm text-gray-500">{{ job.title }}</p>
      </div>
    </div>
    <p class="text-gray-500 mt-2 text-sm line-clamp-3">{{ job.description }}</p>
    <div class="flex justify-between items-center mt-4">
      <span class="font-bold text-blue-600">Rp {{ job.salary_range }}</span>
      <button
        v-if="!isApplied"
        class="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
        @click="goToDetail"
      >
        Apply Now
      </button>
      <span
        v-else
        class="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed"
      >
        Sudah Dilamar
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["job"],
  computed: {
    isApplied() {
      const user = localStorage.getItem("user");
      if (!user) return false;
      
      const currentUser = JSON.parse(user);
      const userId = currentUser.id; // Ambil user ID dari data user yang login
      
      // Struktur baru: applied_jobs berisi object dengan user_id dan job_id
      const appliedJobs = JSON.parse(localStorage.getItem("applied_jobs") || "[]");
      
      // Cek apakah user ini sudah melamar job ini
      return appliedJobs.some(application => 
        application.user_id === userId && application.job_id === this.job.id
      );
    }
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: 'JobDetail',
        params: { id: this.job.id }
      });
    }
  }
};
</script>