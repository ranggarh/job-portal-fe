<template>
  <div>
    <Navbar />
    <HeroSection />
    <CategoryList />

    <section class="py-12 bg-blue-50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Jobs of the day</h2>

        <div v-if="loading" class="text-center text-gray-500">
          Loading jobs...
        </div>

        <div v-else-if="jobs.length === 0" class="text-center text-gray-500">
          No jobs found.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <JobCard v-for="job in jobs" :key="job.id" :job="job" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/Herosection.vue";
import CategoryList from "../components/CategoryList.vue";
import JobCard from "../components/JobCard.vue";
import Footer from "../components/Footer.vue";
import api from "../api/index.js";

export default {
  components: { Navbar, HeroSection, CategoryList, JobCard, Footer },
  data() {
    return {
      jobs: [],
      loading: true
    };
  },
  async mounted() {
    try {
      const res = await api.get("/job-listings");
      if (res.data.status === 200) {
        this.jobs = res.data.data; // pastikan sesuai struktur API Laravel kamu
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      this.loading = false;
    }
  }
};
</script>
