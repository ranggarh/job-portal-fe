<template>
  <div
    class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
  >
    <div class="flex items-center gap-4 mb-4">
      <div
        class="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-50 transition-colors"
      >
        <img 
          :src="job.image_path || '/failed-image.jpg'" 
          :alt="job.company_name"
          @error="handleImageError" 
          class="w-16 h-16 object-contain rounded" 
        />
      </div>
      <div>
        <h3 class="font-semibold text-gray-800 group-hover:text-gray-900">
          {{ job.company_name }}
        </h3>
        <p class="text-gray-500">{{ job.title }}</p>
      </div>
    </div>

    <p class="text-gray-600 mt-3 text-sm line-clamp-3 leading-relaxed">
      {{ job.description }}
    </p>

    <div class="flex flex-wrap gap-2 mt-4 mb-6">
      <span class="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
        >Full Time</span
      >
      <span class="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
        >Remote</span
      >
    </div>

    <div class="flex justify-between items-center">
      <span class="font-bold text-gray-800">Rp {{ job.salary_range }}</span>
      <button
        v-if="!isApplied"
        class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
        @click="goToDetail"
      >
        Apply Now
      </button>
      <span v-else class="bg-gray-400 text-white px-6 py-2 rounded-lg">
        Already Applied
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
      const userId = currentUser.id;

      const appliedJobs = JSON.parse(
        localStorage.getItem("applied_jobs") || "[]"
      );

      return appliedJobs.some(
        (application) =>
          application.user_id === userId && application.job_id === this.job.id
      );
    },
  },
  methods: {
    handleImageError(e) {
      e.target.src = "/failed-image.jpg";
    },
    goToDetail() {
      this.$router.push({
        name: "JobDetail",
        params: { id: this.job.id },
      });
    },
  },
};
</script>
