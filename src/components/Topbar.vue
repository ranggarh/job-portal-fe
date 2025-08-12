<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-xl font-semibold">{{ title }}</h1>
    <div class="flex items-center gap-3 relative group">
      <span class="text-gray-600 cursor-pointer select-none">
        Hi, {{ user?.name }}
      </span>
      <img src="https://ui-avatars.com/api/?name=Admin" class="w-8 h-8 rounded-full" />
      <!-- Dropdown -->
      <div
        class="absolute right-0 mt-12 w-32 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <button
          @click="logout"
          class="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["title", "user"],
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("applied_jobs");
      this.$router.push("/login");
    //   window.location.reload();
    }
  }
}
</script>