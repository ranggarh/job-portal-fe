<template>
  <section class="relative py-12">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/background.jpg" 
        alt="background" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gray-900/75"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-center text-white">Browse by category</h2>
      <p class="text-gray-300 mb-8 text-center">
        Find the job that's perfect for you. About 800+ new jobs everyday.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div 
          v-for="(cat, index) in categories" 
          :key="index" 
          class="p-4 bg-white/90 backdrop-blur border rounded hover:shadow-lg cursor-pointer transition duration-300"
        >
          <h3 class="font-semibold">{{ cat.name }}</h3>
          <p class="text-sm text-gray-500">{{ cat.jobs }} jobs available</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: "Retail & Product", jobs: 3 },
        { name: "Content Writer", jobs: 8 },
        { name: "Human Resource", jobs: 3 },
        { name: "Market Research", jobs: 4 },
        { name: "Software", jobs: 4 },
        { name: "Finance", jobs: 5 },
        { name: "Management", jobs: 5 },
        { name: "Marketing & Sale", jobs: 4 },
      ]
    }
  }
}
</script>