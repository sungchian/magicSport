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
      <main class="">
        <slot />
      </main>
      <footer
        class="footer flex w-full items-center justify-center bg-[#333333]"
      >
        <div class="copyright p-8 w11">
          CopyRight Magics Sports 2022 / {{ version }}
        </div>
      </footer>
    </div>
  </div>
  <the-alert />
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import qrCode from "@/assets/images/btn_float_qrcode.png";
import topIcon from "@/assets/images/btn_arrow_page_to_top.png";
export default {
  setup() {
    const store = useStore();

    const open = reactive({
      topnav: false,
      leftnav: true,
    });

    let version = ref("");

    const getVersion = async () => {
      const res = await store.dispatch("auth/getVersion");
      console.log(version);
      if (res.statusCode === 0) {
        version.value = res.result.appVersionLast;
      } else {
        version.value = "";
      }
    };

    const scrollToTop = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
      getVersion();
    });

    return {
      open,
      qrCode,
      topIcon,
      version,
      scrollToTop,
      getVersion,
    };
  },
};
</script>
