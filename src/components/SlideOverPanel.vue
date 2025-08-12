<template>
  <transition name="slide">
    <div v-if="show" class="fixed inset-0 z-50 flex">
      <div class="flex-1" @click="$emit('close')"></div>
      <div class="w-full max-w-md bg-white h-full shadow-xl p-0 relative">
        <button @click="$emit('close')" class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer">&times;</button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
}
</style>

<script>
export default {
  props: ["show"]
}
</script>