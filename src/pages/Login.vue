<template>
  <div class="min-h-screen flex">
    <!-- Left side - Image with overlay -->
    <div class="hidden lg:block lg:w-1/2 relative">
      <img 
        src="/login3.jpg" 
        alt="Login" 
        class="w-full h-screen object-cover"
      />
      <div class="absolute inset-0 bg-gray-800/80"></div>
    </div>

    <!-- Right side - Login form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center px-8">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-bold mb-8 text-gray-800">Welcome Back!</h2>
        
        <form @submit.prevent="login" class="space-y-4">
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
              placeholder="Enter your password" 
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>

          <button 
            type="submit" 
            class="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300"
          >
            Login
          </button>

          <div 
            v-if="error" 
            class="bg-red-50 text-red-500 p-3 rounded-lg text-center"
          >
            {{ error }}
          </div>
        </form>

        <p class="mt-6 text-center text-gray-600">
          Don't have an account? 
          <router-link 
            to="/register" 
            class="text-gray-800 font-medium hover:underline"
          >
            Register
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/index.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
        this.error = "";
        try {
        const res = await api.post("/login", {
            email: this.email,
            password: this.password
        });
        if (res.data.status === 200) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
            const roleId = res.data.data.user.role_id;
            if (roleId === 3) {
            this.$router.push("/");
            } else if (roleId === 2) {
            this.$router.push("/admin");
            } else if (roleId === 1) {
            this.$router.push("/administrator");
            } else {
            this.$router.push("/");
            }
        } else {
            this.error = res.data.message || "Login gagal";
        }
        } catch (e) {
        this.error = "Login gagal";
        }
    }
    }
};
</script>