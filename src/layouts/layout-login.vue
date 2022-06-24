<template>
  <div
    class="bg-gray-50 mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8"
  >
    <a
      href="#"
      class="text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10"
    >
      <span class="self-center text-3xl font-bold whitespace-nowrap">
        MagicSport Admin
      </span>
    </a>
    <div class="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm">
      <slot />
    </div>
  </div>
  <the-alert />
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
