<template>
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 ml-64 p-6">
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminSidebar from "../components/SidebarAdministrator.vue";
export default { components: { AdminSidebar } };
</script>