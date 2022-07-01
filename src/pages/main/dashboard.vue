<template>
  <div class="flex flex-col items-center mx-auto container">
    <div class="w-full h-40 flex">
      <button
        class="btnPrev w-8 px-2 flex justify-center items-center bg-gray-100 border border-gray-100"
        @click="slidePre"
      >
        <svg
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="rgb(156 163 175)"
            d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"
          />
        </svg>
      </button>

      <swiper
        :slidesPerView="5"
        :spaceBetween="10"
        :slidesPerGroup="5"
        :loop="false"
        :loopFillGroupWithBlank="false"
        :navigation="true"
        :modules="modules"
        class="mySwiper h-full cursor-move"
      >
        <swiper-slide
          v-for="i in 30"
          :key="i"
          class="border border-gray-200 flex flex-col justify-between"
        >
          <div class="flex justify-between m-2 mb-0 text-gray-400 text-sm">
            <div class="whitespace-nowrap">中女超 第{{ i }}輪</div>
            <div class="whitespace-nowrap">未開始</div>
          </div>
          <div class="flex justify-between items-center m-2 mt-1 text-sm">
            <div class="flex flex-col space-y-3">
              <div class="flex whitespace-nowrap">
                <svg
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M509.5 .0234c-6.145 0-12.53 1.344-18.64 4.227c-44.11 20.86-76.81 27.94-104.1 27.94c-57.89 0-91.53-31.86-158.2-31.87C195 .3203 153.3 8.324 96 32.38V32c0-17.75-14.25-32-32-32S32 14.25 32 32L31.96 496c0 8.75 7.25 16 16 16H80C88.75 512 96 504.8 96 496V384c51.74-23.86 92.71-31.82 128.3-31.82c71.09 0 120.6 31.78 191.7 31.78c30.81 0 65.67-5.969 108.1-23.09C536.3 355.9 544 344.4 544 332.1V30.74C544 12.01 527.8 .0234 509.5 .0234zM480 141.8c-31.99 14.04-57.81 20.59-80 22.49v80.21c25.44-1.477 51.59-6.953 80-17.34V308.9c-22.83 7.441-43.93 11.08-64.03 11.08c-5.447 0-10.71-.4258-15.97-.8906V244.5c-4.436 .2578-8.893 .6523-13.29 .6523c-25.82 0-47.35-4.547-66.71-10.08v66.91c-23.81-6.055-50.17-11.41-80-12.98V213.1C236.2 213.7 232.5 213.3 228.5 213.3C208.8 213.3 185.1 217.7 160 225.1v69.1C139.2 299.4 117.9 305.8 96 314.4V250.7l24.77-10.39C134.8 234.5 147.6 229.9 160 225.1V143.4C140.9 148.5 120.1 155.2 96 165.3V101.8l24.77-10.39C134.8 85.52 147.6 80.97 160 77.02v66.41c26.39-6.953 49.09-10.17 68.48-10.16c4.072 0 7.676 .4453 11.52 .668V65.03C258.6 66.6 274.4 71.55 293.2 77.83C301.7 80.63 310.7 83.45 320 86.12v66.07c20.79 6.84 41.45 12.96 66.71 12.96c4.207 0 8.781-.4766 13.29-.8594V95.54c25.44-1.477 51.59-6.953 80-17.34V141.8zM240 133.9v80.04c18.61 1.57 34.37 6.523 53.23 12.8C301.7 229.6 310.7 232.4 320 235.1V152.2C296.1 144.3 271.6 135.8 240 133.9z"
                  />
                </svg>
                <span class="ml-1.5">奧格斯堡</span>
              </div>
              <div class="flex whitespace-nowrap">
                <svg
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"
                  />
                </svg>
                <span class="ml-1.5">沙爾克</span>
              </div>
            </div>
            <div class="flex flex-col self-center">
              <span class="whitespace-nowrap">06-31</span>
              <span class="whitespace-nowrap">03:15</span>
            </div>
          </div>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            class="flex space-x-2 justify-center items-center py-2 border-t border-gray-100 w-full"
          >
            <svg
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              v-if="20 > i"
            >
              <path
                fill="rgb(8 145 178)"
                d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM416.6 360.9l-85.4-1.297l-25.15 81.59C290.1 445.5 273.4 448 256 448s-34.09-2.523-50.09-6.859L180.8 359.6l-85.4 1.297c-18.12-27.66-29.15-60.27-30.88-95.31L134.3 216.4L106.6 135.6c21.16-26.21 49.09-46.61 81.06-58.84L256 128l68.29-51.22c31.98 12.23 59.9 32.64 81.06 58.84L377.7 216.4l69.78 49.1C445.8 300.6 434.8 333.2 416.6 360.9z"
              />
            </svg>
            {{ 20 > i ? "魔球直播" : "集錦" }}
          </a>
        </swiper-slide>
      </swiper>

      <div class="flex ml-2">
        <div
          class="w-8 h-full whitespace-pre-wrap px-2 flex items-center border"
        >
          <span>查看全部賽程</span>
        </div>
        <button
          class="btnNext w-8 flex justify-center items-center bg-gray-100"
          @click="slideNext"
        >
          <svg
            width="14"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="rgb(156 163 175)"
              d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="home-top flex w-full">
      <div class="w-2/3 pr-12">
        <div class="flex space-x-8 mt-8 items-center" v-for="i in 2" :key="i">
          <div class="relative">
            <img
              class="object-cover w-full relative"
              src="../../assets/images/girl1.jpeg"
            />
            <div
              class="absolute truncate -translate-y-6 text-gray-300 w-full"
              style="background-color: rgba(0, 0, 0, 0.5)"
            >
              124341243412434124341243412124341243412434124341243412434434
            </div>
          </div>
          <ul class="p-2 first-line:text-2xl space-y-2 w-2/3">
            <li class="truncate" v-for="i in 8" :key="i">
              124341243412434124341243412124341243412434124341243412434434
            </li>
          </ul>
        </div>
      </div>

      <div class="w-1/3 mt-10">
        <div class="space-y-4">
          <div class="flex space-x-6" v-for="i in 3" :key="i">
            <div class="w-2/5">
              <img
                class="object-cover w-full"
                style="height: 5em"
                src="../../assets/images/girl2.jpeg"
              />
            </div>
            <div class="w-full line-clamp2 h-12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              sequi esse necessitatibus adipisci quas aut voluptas voluptatibus
              sunt ducimus quisquam, provident magni eos obcaecati impedit!
              beatae dolor sint eos!
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex w-full" v-for="i in 8" :key="i">
            <div class="flex mt-2 w-full" :class="{ 'text-2xl mt-0': i === 1 }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="20"
                height="20"
                v-if="i !== 1"
              >
                <path
                  fill="rgb(8 145 178)"
                  d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM312.3 273.6l-112 104C195.8 381.8 189.9 384 184 384c-3.25 0-6.5-.6562-9.594-2C165.7 378.2 160 369.5 160 360v-208c0-9.531 5.656-18.19 14.41-22c8.75-3.75 18.94-2.062 25.94 4.406l112 104C317.2 242.1 320 249.3 320 256S317.2 269 312.3 273.6z"
                />
              </svg>
              <div class="truncate w-full" :class="{ 'ml-2': i !== 1 }">
                12434124341243412434124341212434243412434124341243412434434
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home-buttom flex w-full">
      <div class="bottom-left w-2/3 pr-12 mt-10">
        <div class="highlights w-full">
          <div class="block-title flex justify-between border-b-2 w-full">
            <span class="tit-text">热门视频</span>
            <b class="more-text">更多></b>
          </div>
          <div class="grid grid-rows-2 grid-flow-col gap-4 mt-4">
            <div v-for="i in 8" :key="i" class="">
              <img
                class="object-cover w-full relative"
                style="height: 6em"
                src="../../assets/images/girl1.jpeg"
              />
              <div class="sm-title line-clamp">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto porro neque dicta repudiandae, voluptatum sint
                corporis. Quisquam dolore dignissimos similique maxime ipsum?
                Nesciunt, placeat? Animi fuga dolores quidem soluta inventore!
              </div>
            </div>
          </div>
        </div>
        <div class="game-live mt-8">
          <div class="block-title flex justify-between border-b-2 w-full">
            <span class="tit-text">比赛直播</span>
          </div>

          <table
            v-for="i in 5"
            :key="i"
            class="custom-table table-fixed min-w-full divide-y divide-gray-200 border-collapse"
          >
            <div class="block-title flex justify-between w-full py-4">
              <span class="flex">
                <img
                  src="../../assets/images/title-pre-icon.png"
                  alt=""
                  class="mr-2"
                />
                2022-01-01</span
              >
            </div>
            <tbody>
              <tr
                class="hover:bg-gray-100 cursor-pointer"
                v-for="row in 5"
                :key="`row-${row.id}`"
                @click="linkToCompetition"
              >
                <td class="text-center border-b border-gray-200">time</td>
                <td class="text-center border-b border-gray-200">round</td>
                <td class="text-center border-b border-gray-200">teamA</td>
                <td class="text-center border-b border-gray-200">vs-score</td>
                <td class="text-center border-b border-gray-200">teamB</td>
                <td class="text-center border-b border-gray-200">高清解說</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bottom-right w-1/3 mt-10">
        <div class="bottom-right-top bg-gray-300">
          <div class="block-title flex justify-between border-b-2 w-full">
            <span class="tit-text">数据</span>
            <b class="more-text">更多></b>
          </div>
          <div class="block-title flex justify-around border-b-2 w-full p-2">
            <span v-for="i in 6" :key="i" class="data-list-title cursor-pointer"
              >中超</span
            >
          </div>
          <div class="block-title flex justify-around border-b-2 w-full p-2">
            <span
              class="data-list-title cursor-pointer border-r-2 w-1/2 text-center"
              >积分</span
            >
            <span class="data-list-title cursor-pointer w-1/2 text-center"
              >射手榜</span
            >
          </div>
          <table class="table-fixed w-full m-auto">
            <thead>
              <tr>
                <th class="w-1/6">名次</th>
                <th class="w-2/6">球队</th>
                <th class="w-2/6">胜/平/负</th>
                <th class="w-1/6">积分</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 18" :key="i" class="text-center h-8">
                <td class="w-1/6" :class="{ 'bg-green-400': i <= 3 }">
                  {{ i }}
                </td>
                <td class="w-2/6">Haha</td>
                <td class="w-2/6">5/1/0</td>
                <td class="w-1/6">32</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bottom-right-bottom mt-10">
          <div class="block-title flex justify-between border-b-2 w-full pb-4">
            <span class="flex">
              <img
                src="../../assets/images/title-pre-icon.png"
                alt=""
                class="mr-2"
              />
              热门推荐</span
            >
          </div>
          <div class="hot-new-list">
            <p v-for="i in 20" :key="i" class="">
              <a href="#" class="line-clamp leading-loose"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                quisquam tempora pariatur sequi deserunt repellendus explicabo.
                Animi numquam illum dolorem officiis nisi voluptatibus impedit,
                atque quo minus ratione quia iure?</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
// import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // const store = useStore();
    const { t } = useI18n();

    const data = reactive({
      carousel: [],
    });

    // const getCarousel = async () => {
    //   const res = await store.dispatch("main/dashboard/read/carousel");
    //   // if (!res.error) {
    //   // data.carousel = res;
    //   // }
    //   console.log(res);
    // };

    // 因為改不到swiper套件的按鈕 => 自訂按鈕 orz
    const slidePre = () => {
      const btn = document.querySelector(".swiper-button-prev");
      btn.click();
      checkBtnDisabled();
    };
    const slideNext = () => {
      const btn = document.querySelector(".swiper-button-next");
      btn.click();
      checkBtnDisabled();
    };
    const checkBtnDisabled = () => {
      const prevBtn = document.querySelector(".swiper-button-prev");
      const nextBtn = document.querySelector(".swiper-button-next");
      const btnPrev = document.querySelector(".btnPrev");
      const btnNext = document.querySelector(".btnNext");
      prevBtn.classList.value.includes("swiper-button-disabled")
        ? (btnPrev.style.opacity = 0.5)
        : (btnPrev.style.opacity = 1);
      nextBtn.classList.value.includes("swiper-button-disabled")
        ? (btnNext.style.opacity = 0.5)
        : (btnNext.style.opacity = 1);
    };
    onMounted(() => {
      // getCarousel();
      checkBtnDisabled();
    });
    return {
      t,
      data,
      // getCarousel,
      slidePre,
      slideNext,
      modules: [Navigation],
    };
  },
};
</script>

<style lang="scss" scoped></style>
