<template>
  <footer class="bg-gray-900 text-gray-300 py-8 mt-12">
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
      
      <!-- Company Info -->
      <div>
        <h3 class="text-white text-lg font-semibold mb-4">JobBox</h3>
        <p class="text-sm">
          Your trusted job portal platform. Helping job seekers and employers connect faster and easier.
        </p>
      </div>
      
      <!-- Quick Links -->
      <div>
        <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/" class="hover:text-blue-400">Home</a></li>
          <li><a href="#" class="hover:text-blue-400">Find a Job</a></li>
          <li><a href="#" class="hover:text-blue-400">Recruiters</a></li>
          <li><a href="#" class="hover:text-blue-400">Blog</a></li>
        </ul>
      </div>
      
      <!-- Contact -->
      <div>
        <h3 class="text-white text-lg font-semibold mb-4">Contact Us</h3>
        <ul class="text-sm space-y-2">
          <li>Email: <a href="mailto:support@jobbox.com" class="hover:text-blue-400">support@jobbox.com</a></li>
          <li>Phone: +62 812-3456-7890</li>
          <li>Address: Surabaya, Indonesia</li>
        </ul>
      </div>

    </div>
    <div class="text-center text-xs text-gray-500 mt-8 border-t border-gray-700 pt-4">
      &copy; {{ new Date().getFullYear() }} JobBox. All rights reserved.
    </div>
  </footer>
</template>
