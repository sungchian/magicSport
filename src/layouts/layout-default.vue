<template>
  <div class="float-wrap fixed w-32 h-72 bottom-2.5 right-2.5 z-50">
    <img :src="qrCode" alt="" class="mb-7" />
    <img
      :src="topIcon"
      alt=""
      class="m-auto cursor-pointer"
      @click="scrollToTop"
    />
  </div>
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
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
  <the-alert />
</template>

<script>
import { reactive } from "vue";
import qrCode from "@/assets/images/qr_code.png";
import topIcon from "@/assets/images/top-icon.jpeg";
export default {
  setup() {
    const open = reactive({
      topnav: false,
      leftnav: true,
    });

    const scrollToTop = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return {
      open,
      qrCode,
      topIcon,
      scrollToTop,
    };
  },
};
</script>
