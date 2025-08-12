<template>
  <aside :class="`bg-gray-800 text-white h-screen fixed top-0 left-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`">
    <div class="flex items-center justify-between p-4">
      <span v-if="isOpen" class="text-lg font-bold">Admin</span>
      <button @click="$emit('toggle')" class="text-white focus:outline-none">
        ☰
      </button>
    </div>
    <ul class="mt-6 space-y-2">
      <li>
        <router-link to="/dashboard" class="block px-4 py-2 hover:bg-gray-700">🏠 <span v-if="isOpen">Dashboard</span></router-link>
      </li>
      <li>
        <router-link to="/dashboard/jobs" class="block px-4 py-2 hover:bg-gray-700">💼 <span v-if="isOpen">Manage Jobs</span></router-link>
      </li>
      <li>
        <router-link to="/dashboard/users" class="block px-4 py-2 hover:bg-gray-700">👥 <span v-if="isOpen">Users</span></router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: ["isOpen"]
}
</script>
