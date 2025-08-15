<template>
  <nav class="flex justify-between items-center px-8 py-4 glassmorphism fixed w-full z-50">
    <div class="text-xl font-bold">Jobby</div>
    <ul class="flex gap-6 text-gray-600 items-center">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/jobs">Find a Job</router-link></li>
      <template v-if="!user">
        <li><router-link to="/login">Login</router-link></li>
        <li>
          <router-link
            to="/register"
            class="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Sign Up
          </router-link>
        </li>
      </template>
      <template v-else>
        <li class="relative group">
          <span class="font-bold text-gray-800 cursor-pointer">
            {{ user.name }}
          </span>
          <div
            class="absolute right-0 mt-2 w-32 bg-white  rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <p class="text-red-800 font-semibold">Logout</p>
            </button>
          </div>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import api from "../api/index.js";
export default {
  data() {
    return {
      user: null
    };
  },
  mounted() {
    this.loadUser();
    window.addEventListener("storage", this.loadUser); // listen perubahan localStorage
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.loadUser);
  },
  methods: {
    loadUser() {
      const user = localStorage.getItem("user");
      this.user = user ? JSON.parse(user) : null;
    },
    async logout() {
      try {
        await api.post("/logout"); // panggil endpoint logout jika perlu
      } catch (e) {}
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.user = null;
      window.location.reload(); // reload agar navbar update
    }
  }
};
</script>

<style>
.glassmorphism {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>