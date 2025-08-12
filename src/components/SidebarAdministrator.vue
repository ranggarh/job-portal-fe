<template>
  <aside class="bg-gray-800 text-white h-screen fixed top-0 left-0 w-64">
    <div class="p-4 text-lg font-bold">Administrator</div>
    <ul class="space-y-2 mt-6">
      <li>
        <router-link to="/administrator/users" class="block px-4 py-2 hover:bg-gray-700">Manage Users</router-link>
      </li>
      <li>
        <router-link to="/administrator/roles" class="block px-4 py-2 hover:bg-gray-700">Manage Roles</router-link>
      </li>
    </ul>
  </aside>
</template>