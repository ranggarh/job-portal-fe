<template>
  <div class="bg-blue-50 min-h-screen">
    <Navbar />
    
    <!-- Search Filters -->
    <div class="mx-auto px-20 pt-20 relative z-10">
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <!-- Job Title Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <div class="relative">
              <input
                v-model="searchFilters.title"
                type="text"
                placeholder="UI/UX Designer"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="searchJobs"
              />
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          <!-- Location Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              v-model="searchFilters.location"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="searchJobs"
            >
              <option value="">All Locations</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Bandung">Bandung</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <!-- Job Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select
              v-model="searchFilters.type"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="searchJobs"
            >
              <option value="">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <!-- Experience Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select
              v-model="searchFilters.experience"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="searchJobs"
            >
              <option value="">All Levels</option>
              <option value="Fresher">Fresher</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6">
          <button
            @click="clearFilters"
            class="text-gray-600 hover:text-gray-800 font-medium cursor-pointer"
          >
            Clear Filters
          </button>
          <button
            @click="searchJobs"
            class="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 cursor-pointer transition-colors duration-300 font-medium"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Job Listings -->
    <div class=" mx-auto px-20 pb-12">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Related Jobs</h2>
          <p class="text-gray-700">{{ filteredJobs.length }} jobs found</p>
        </div>
        <button class="text-gray-700 hover:text-gray-800 font-medium">
          More Filters
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p class="text-gray-300">Loading jobs...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredJobs.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
        <p class="text-gray-400">Try adjusting your search filters</p>
      </div>

      <!-- Job List and Detail Layout -->
      <div v-else class="flex gap-6 min-h-[600px]">
        <!-- Left Side: Job List (30%) -->
        <div class="w-[35%] bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-800">Job Listings</h3>
          </div>
          <div class="overflow-y-auto max-h-[500px]">
            <div
              v-for="job in filteredJobs"
              :key="job.id"
              @click="selectJob(job)"
              :class="{
                'bg-blue-50 border-l-4 border-l-gray-800': selectedJob?.id === job.id,
                'hover:bg-gray-50': selectedJob?.id !== job.id
              }"
              class="p-4 border-b border-gray-100 cursor-pointer transition-colors"
            >
              <div class="flex items-start gap-3">
                <img 
                  :src="job.image_path || '/failed-image.jpg'" 
                  :alt="job.company_name"
                  @error="handleImageError" 
                  class="w-12 h-12 object-contain rounded flex-shrink-0" 
                />
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-gray-800 truncate">{{ job.title }}</h4>
                  <p class="text-sm text-gray-600 truncate">{{ job.company_name }}</p>
                  <p class="text-xs text-gray-500 mt-1">Rp {{ job.salary_range }}</p>
                  <div class="flex gap-1 mt-2">
                    <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Full Time</span>
                    <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">Remote</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Load More Button -->
          <div v-if="filteredJobs.length >= itemsPerPage" class="p-4 border-t border-gray-200">
            <button
              @click="loadMore"
              class="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300 font-medium"
            >
              Load More Jobs
            </button>
          </div>
        </div>

        <!-- Right Side: Job Detail (70%) -->
        <div class="w-[65%] bg-white rounded-xl shadow-lg">
          <!-- Job Detail Content -->
          <div v-if="selectedJob" class="h-full flex flex-col">
            <!-- Job Header -->
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-start gap-4">
                <img 
                  :src="selectedJob.image_path || '/failed-image.jpg'" 
                  :alt="selectedJob.company_name"
                  @error="handleImageError" 
                  class="w-16 h-16 object-contain rounded" 
                />
                <div class="flex-1">
                  <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedJob.title }}</h1>
                  <p class="text-lg text-gray-600 mb-2">{{ selectedJob.company_name }}</p>
                  <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span>📍 {{ selectedJob.location || 'Remote' }}</span>
                    <span>💰 Rp {{ selectedJob.salary_range }}</span>
                    <span>⏰ Full Time</span>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <button
                    @click="applyToJob"
                    class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 cursor-pointer transition-colors duration-300 font-medium"
                  >
                    Apply Now
                  </button>
                  <button
                    class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
                  >
                    Save Job
                  </button>
                </div>
              </div>
            </div>

            <!-- Job Description -->
            <div class="flex-1 p-6 overflow-y-auto">
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">Job Description</h3>
                  <p class="text-gray-600 leading-relaxed">{{ selectedJob.description }}</p>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
                  <div class="text-gray-600 leading-relaxed">
                    <p>{{ selectedJob.requirements || 'Requirements will be specified during application process.' }}</p>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-3">Company Info</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Learn more about {{ selectedJob.company_name }} and join our growing team of talented professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- No Job Selected State -->
          <div v-else class="h-full flex items-center justify-center">
            <div class="text-center">
              <div class="text-gray-400 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-gray-600 mb-2">Select a job to view details</h3>
              <p class="text-gray-500">Choose a job from the list to see full details and apply</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import JobCard from "../components/JobCard.vue";
import api from "../api/index.js";
import Swal from "sweetalert2";

export default {
  name: "FindJob",
  components: {
    Navbar,
    JobCard
  },
  data() {
    return {
      jobs: [],
      filteredJobs: [],
      selectedJob: null, // Add selected job state
      loading: true,
      itemsPerPage: 10,
      currentPage: 1,
      searchFilters: {
        title: "",
        location: "",
        type: "",
        experience: ""
      }
    };
  },
  async mounted() {
    await this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        this.loading = true;
        const res = await api.get("/job-listings");
        if (res.data.status === 200) {
          this.jobs = res.data.data;
          this.filteredJobs = [...this.jobs];
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        this.loading = false;
      }
    },
    
    searchJobs() {
      let filtered = [...this.jobs];

      // Filter by title
      if (this.searchFilters.title.trim()) {
        const searchTerm = this.searchFilters.title.toLowerCase();
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company_name.toLowerCase().includes(searchTerm)
        );
      }

      // Filter by location
      if (this.searchFilters.location) {
        filtered = filtered.filter(job => 
          job.location && job.location.includes(this.searchFilters.location)
        );
      }

      // Filter by job type
      if (this.searchFilters.type) {
        filtered = filtered.filter(job => 
          job.job_type === this.searchFilters.type
        );
      }

      // Filter by experience
      if (this.searchFilters.experience) {
        filtered = filtered.filter(job => 
          job.experience_level === this.searchFilters.experience
        );
      }

      this.filteredJobs = filtered.slice(0, this.itemsPerPage * this.currentPage);
    },

    clearFilters() {
      this.searchFilters = {
        title: "",
        location: "",
        type: "",
        experience: ""
      };
      this.filteredJobs = [...this.jobs].slice(0, this.itemsPerPage);
      this.currentPage = 1;
    },

    loadMore() {
      this.currentPage++;
      this.searchJobs();
    },

    selectJob(job) {
      this.selectedJob = job;
    },

    handleImageError(e) {
      e.target.src = "/failed-image.jpg";
    },

    async applyToJob() {
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!user) {
        // Show login required alert
        const result = await Swal.fire({
          title: "Login Required",
          text: "You need to login to apply for this job. Would you like to login now?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#1f2937", // bg-gray-800
          cancelButtonColor: "#6b7280", // bg-gray-500
          confirmButtonText: "Login",
          cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
          // Redirect to login page
          this.$router.push("/login");
        }
        return;
      }

      // If user is logged in, proceed to apply
      if (this.selectedJob) {
        this.$router.push({
          name: 'Apply',
          params: { id: this.selectedJob.id }
        });
      }
    }
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>