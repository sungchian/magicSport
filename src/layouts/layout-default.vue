<template>
  <the-header v-model:topnav="open.topnav" v-model:leftnav="open.leftnav" />
  <div class="flex overflow-hidden bg-white pt-16">
    <!-- <the-aside v-model:leftnav="open.leftnav" /> -->
    <div class="bg-gray-900 opacity-50 fixed inset-0 z-10 hidden"></div>
    <div
      class="h-full w-full relative overflow-y-auto transition-all duration-75"
      :class="{
        'lg:ml-16': !open.leftnav,
      }"
    >
      <main class="p-3">
        <!-- <the-breadcrumb class="mb-2" /> -->
        <slot />
      </main>
    </div>
  </div>
  <the-alert />
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const open = reactive({
      topnav: false,
      leftnav: true,
    });
    return {
      open,
    };
  },
};
</script>
