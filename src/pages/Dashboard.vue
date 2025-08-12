<template>
  <div class="flex">
    <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />
    <div :class="`flex-1 transition-all ${sidebarOpen ? 'ml-64' : 'ml-16'}`">
      <Topbar :title="'Dashboard'" :user="user" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import api from "../api/index.js";

export default {
  components: { Sidebar, Topbar },
  data() {
    return {
      sidebarOpen: true,
      user: null
    }
  },
  async mounted() {
    const res = await api.get("/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    this.user = res.data.data;
  }
}
</script>
