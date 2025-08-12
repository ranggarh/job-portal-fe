<template>
  <div class="max-w-sm mx-auto py-16">
    <h2 class="text-2xl font-bold mb-6">Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full mb-3 p-2 border rounded" required />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
    <p class="mt-4 text-sm">Belum punya akun? <router-link to="/register" class="text-blue-500">Register</router-link></p>
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