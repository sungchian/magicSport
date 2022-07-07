<template>
  <div class="download overflow-hidden">
    <div class="container relative m-auto flex w-full pt-16">
      <div class="download-left w-7/12">
        <div class="title text-5xl p-8">直播间与百万球迷互动</div>
        <div class="left flex items-center">
          <div class="download-btn">
            <div class="iphone flex p-8">
              <img
                class="w-80 h-24"
                src="../../src/assets/images/iphone.png"
                alt=""
              />
            </div>
            <div class="phone p-8">
              <img
                class="w-80 h-24"
                src="../../src/assets/images/iphone.png"
                alt=""
              />
            </div>
          </div>
          <div class="qrcode p-8">
            <img
              class="w-48 h-48"
              src="../../src/assets/images/girl1.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="download-right w-5/12">
        <div class="app-swiper relative">
          <img
            class="absolute z-20"
            src="../../src/assets/images/iphone-frame.png"
            alt=""
          />
          <swiper
            class="mySwiper h-[660px] w-96 absolute top-6 left-4"
            :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :modules="modules"
          >
            <swiper-slide
              ><img
                src="../../src/assets/images/girl1.jpeg"
                alt="" /></swiper-slide
            ><swiper-slide
              ><img
                src="../../src/assets/images/girl2.jpeg"
                alt="" /></swiper-slide
            ><swiper-slide
              ><img src="../../src/assets/images/girl3.png" alt=""
            /></swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import "swiper/swiper.min.css";
import { Autoplay } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
};
</script>

<style scoped>
.download {
  height: 720px;
  background: #16b13a;
}
</style>
