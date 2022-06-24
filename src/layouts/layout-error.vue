<template>
  <main class="min-h-full">
    <div
      class="flex px-6 justify-center items-center flex-col mx-auto h-screen"
    >
      <div class="hidden md:block md:max-w-lg">
        <img :src="image" />
      </div>
      <div class="text-center">
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold leading-tight mb-3"
        >
          Page not found
        </h1>
        <p class="text-base md:text-lg font-normal text-gray-500 mb-5">
          Oops! Looks like you followed a bad link. If you think this is a
          problem with us, please tell us.
        </p>
        <router-link
          :to="{ name: 'default-path' }"
          class="text-white font-medium text-center px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 focus:shadow-none rounded-lg inline-flex items-center mr-3"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Go back home
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import image from "@/assets/images/404.svg";

export default {
  setup() {
    return {
      image,
    };
  },
};
</script>
