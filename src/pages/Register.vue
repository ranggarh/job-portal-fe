<template>
  <div class="h-screen flex">
    <!-- Left side - Register form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-bold mb-8 text-gray-800">Create Account</h2>
        
        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-2">Full Name</label>
            <input 
              v-model="name" 
              type="text" 
              placeholder="Enter your name" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-2">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Enter your email" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>

          <div>
            <label class="block text-gray-700 mb-2">Password</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Create a password" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>

          <button 
            type="submit" 
            class="cursor-pointer w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300"
          >
            Create Account
          </button>

          <div 
            v-if="error" 
            class="bg-red-50 text-red-500 p-3 rounded-lg text-center"
          >
            {{ error }}
          </div>
        </form>

        <p class="mt-6 text-center text-gray-600">
          Already have an account? 
          <router-link 
            to="/login" 
            class="text-gray-800 font-medium hover:underline"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>

    <!-- Right side - Image with overlay -->
    <div class="hidden lg:block lg:w-1/2 relative">
      <img 
        src="/login1.jpg" 
        alt="Register" 
        class="w-full h-screen object-cover"
      />
      <div class="absolute inset-0 bg-gray-800/70"></div>
    </div>
  </div>
</template>

<script>
import api from "../api/index.js";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async register() {
      this.error = "";
      try {
        const res = await api.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password
        });
        if (res.data.status === 200) {
          this.$router.push("/login");
        } else {
          this.error = res.data.message || "Register gagal";
        }
      } catch (e) {
        this.error = "Register gagal";
      }
    }
  }
};
</script>