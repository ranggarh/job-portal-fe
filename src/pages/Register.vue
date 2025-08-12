<template>
  <div class="max-w-sm mx-auto py-16">
    <h2 class="text-2xl font-bold mb-6">Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" class="w-full mb-3 p-2 border rounded" required />
      <input v-model="email" type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full mb-3 p-2 border rounded" required />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
    <p class="mt-4 text-sm">Sudah punya akun? <router-link to="/login" class="text-blue-500">Login</router-link></p>
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