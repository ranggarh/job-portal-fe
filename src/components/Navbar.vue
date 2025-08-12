<template>
  <nav class="flex justify-between items-center px-8 py-4 bg-white shadow">
    <div class="text-xl font-bold">JobBox</div>
    <ul class="flex gap-6 text-gray-600 items-center">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/jobs">Find a Job</router-link></li>
      <template v-if="!user">
        <li><router-link to="/login">Login</router-link></li>
        <li>
          <router-link
            to="/register"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </router-link>
        </li>
      </template>
      <template v-else>
        <li class="relative group">
          <span class="font-semibold text-blue-600 cursor-pointer">
            {{ user.name }}
          </span>
          <div
            class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
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
      this.$router.push("/login");
      window.location.reload(); // reload agar navbar update
    }
  }
};
</script>