<template>
  <section class="bg-gray-100 py-30">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center px-4">
      <div>
        <p class="text-gray-600 mb-2">Any industry, Any location, Any experience level 🏆</p>
        <h1 class="text-5xl font-bold leading-tight mb-4">
          Your dream job
          <br />is waiting 
          <span class="relative">
            here
            <!-- <img src="/home.png" alt="underline" class="absolute -bottom-2 left-0 w-full"/> -->
          </span>
        </h1>
        <p class="text-gray-600 mb-8">
          Let your talents, personality and potential do the talking. We give you the opportunity to share your story through.
        </p>
        <div class="bg-white rounded-lg p-2 flex gap-2 mb-8 shadow-sm">
          <div class="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search your job" 
              class="w-full p-2 focus:outline-none"
            />
          </div>
          <button class="cursor-pointer bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 font-medium">
            Get Started
          </button>
        </div>

        <div>
          <p class="font-medium mb-3">Our more candidates</p>
          <div class="flex -space-x-3">
            <img src="/person1.jpg" alt="candidate" class="w-12 h-12 rounded-full border-2 border-white"/>
            <img src="/person2.jpg" alt="candidate" class="w-12 h-12 rounded-full border-2 border-white"/>
            <img src="/person3.jpg" alt="candidate" class="w-12 h-12 rounded-full border-2 border-white"/>
            <img src="/person4.jpg" alt="candidate" class="w-12 h-12 rounded-full border-2 border-white"/>
            <span class="w-12 h-12 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500">50+</span>
          </div>
        </div>
      </div>

      <div class="relative md:h-[500px]">
        <img 
          src="/home.png" 
          alt="home Image" 
          class="w-full h-full object-cover rounded-2xl"
        />
        
        <div class="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <img src="/person1.jpg" alt="Google" class="w-10 h-10 rounded-full"/>
          </div>
          <div>
            <p class="font-medium">Rangga Raditya Hariyanto</p>
            <p class="text-sm text-gray-500">Fullstack Developer</p>
          </div>
          <div class="flex text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm ml-1">4.5</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>