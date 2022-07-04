<template>
  <div class="flex flex-col items-center mx-auto container">
    <div class="w-full mt-8 h-40 border">輪播圖</div>

    <div class="home-top flex w-full">
      <div class="w-2/3 pr-12">
        <div class="flex space-x-8 mt-8 items-center" v-for="i in 2" :key="i">
          <div class="relative top-left-img">
            <img
              class="object-cover w-full relative h-60 min-w-[320px]"
              src="../../assets/images/girl1.jpeg"
              style=""
            />
            <div
              class="absolute truncate -translate-y-6 text-gray-300 w-full"
              style="background-color: rgba(0, 0, 0, 0.5)"
            >
              韩国足协官方：正式向亚足联递交2023年亚洲杯承办申请书
            </div>
          </div>
          <ul class="space-y-2 w-2/3 top-right-content">
            <li
              class="truncate"
              v-for="i in 8"
              :key="i"
              :class="[i === 1 ? 'w07' : 'w08']"
            >
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
                style="height: 70px"
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

        <div class="mt-4">
          <div class="flex w-full" v-for="i in 8" :key="i">
            <div
              class="flex mt-2 w-full items-center"
              :class="[i === 1 ? 'w07' : 'w08']"
            >
              <img
                src="../../assets/images/btn_play_bottom.png"
                alt=""
                v-if="i != 1"
                class="play-btn"
              />
              <div class="truncate w-full" :class="[i === 1 ? 'w07' : 'w08']">
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
          <div
            class="block-title flex justify-between border-[#F2F2F2] border-b-2 w-full"
          >
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
              <div class="sm-title line-clamp w04">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto porro neque dicta repudiandae, voluptatum sint
                corporis. Quisquam dolore dignissimos similique maxime ipsum?
                Nesciunt, placeat? Animi fuga dolores quidem soluta inventore!
              </div>
            </div>
          </div>
        </div>
        <div class="game-live mt-8">
          <div
            class="block-title flex justify-between border-[#F2F2F2] border-b-2 w-full"
          >
            <span class="tit-text">比赛直播</span>
          </div>

          <Table v-for="i in 3" :key="i">
            <template #tbody>
              <div class="block-title flex justify-between w-full py-4">
                <span class="flex">
                  <img
                    src="../../assets/images/icon_title_line.png"
                    alt=""
                    class="mr-2"
                  />
                  2022-01-02</span
                >
              </div>

              <tr
                class="hover:bg-gray-200 h-16 cursor-pointer"
                :class="{ 'bg-gray-100': row % 2 }"
                v-for="row in 5"
                :key="`row-${row}`"
                @click="competitionInfo"
              >
                <td class="text-center">time</td>
                <td class="text-center">round</td>
                <td class="text-center h-full">
                  <div class="flex justify-end">
                    <div>teamA&nbsp;&nbsp;</div>
                    <img
                      src="../../assets/images/flag.png"
                      alt=""
                      class="team-pic h-full"
                    />
                  </div>
                </td>
                <td class="text-center">vs-score</td>
                <td class="text-center h-full">
                  <div class="flex justify-start">
                    <img
                      src="../../assets/images/flag.png"
                      alt=""
                      class="team-pic h-full"
                    />
                    <div>&nbsp;&nbsp;teamB</div>
                  </div>
                </td>

                <td class="text-center text-green-600" style="font-size: 14px">
                  高清解說
                </td>
              </tr>
            </template>
          </Table>
        </div>
      </div>
      <div class="bottom-right w-1/3 mt-10">
        <div class="bottom-right-top bg-gray-100">
          <div class="block-title flex justify-between border-b-2 w-full">
            <span class="tit-text">数据</span>
            <b class="more-text">更多></b>
          </div>
          <div class="block-title">
            <ul
              class="flex justify-around border-[#F2F2F2] border-b-2 w-full p-2"
            >
              <li
                v-for="i in homeDataList"
                :key="i.id"
                class="data-list-title-item flex w04"
                @click="dataTitleClick(i.id)"
              >
                <label
                  :for="i.id"
                  class="cursor-pointer"
                  :class="{ w05: i.id === data.dataTitle }"
                >
                  <input type="checkbox" :checked="i.id === data.dataTitle" />
                  <span>{{ i.name }}</span>
                </label>
              </li>
            </ul>
          </div>
          <div class="block-title">
            <ul
              class="flex justify-around border-[#F2F2F2] border-b-2 w-full p-2"
            >
              <li
                v-for="i in data.subTitle"
                :key="i.id"
                class="data-list-title-item flex w04"
                @click="dataSubTitleClick(i.id)"
              >
                <label
                  :for="i.id"
                  class="cursor-pointer"
                  :class="{ w05: i.id === data.dataSubTitle }"
                >
                  <input
                    type="checkbox"
                    :checked="i.id === data.dataSubTitle"
                  />
                  <span>{{ i.subtitle }}</span>
                </label>
              </li>
            </ul>
          </div>
          <table class="table-fixed w-full m-auto mt-2">
            <thead>
              <tr>
                <th class="w-1/6 w03">名次</th>
                <th class="w-2/6 w03">球队</th>
                <th class="w-2/6 w03">胜/平/负</th>
                <th class="w-1/6 w03">积分</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 18" :key="i" class="text-center h-8">
                <td class="w-1/6 w04">
                  <div
                    class="mx-4"
                    :class="{ 'bg-[#16B13A]': i <= 3, w06: i <= 3 }"
                  >
                    {{ i }}
                  </div>
                </td>
                <td class="w-2/6 w04">Haha</td>
                <td class="w-2/6 w04">5/1/0</td>
                <td class="w-1/6 w04">32</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bottom-right-bottom mt-10">
          <div
            class="block-title flex justify-between border-[#F2F2F2] border-b-2 w-full pb-4"
          >
            <span class="flex">
              <img
                src="../../assets/images/icon_title_line.png"
                alt=""
                class="mr-2 w08"
              />
              热门推荐</span
            >
          </div>
          <div class="hot-new-list">
            <p v-for="i in 20" :key="i" class="w08">
              <a href="#" class="line-clamp leading-loose"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                quisquam tempora pariatur sequi deserunt repellendus explicabo.
                Animi numquam illum dolorem officiis nisi voluptatibus impedit,
                atque quo minus ratione quia iure?</a
              >
            </p>
          </div>
          <swiper
            :slides-per-view="3"
            :space-between="50"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import "swiper/swiper.min.css";
import Table from "@/widgets/table";
import homeDataList from "@/constants/home-data-list";

export default {
  components: {
    Table,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const data = reactive({
      dataTitle: 1,
      dataSubTitle: 1,
      subTitle: [
        { id: 1, subtitle: "积分" },
        { id: 2, subtitle: "射手榜" },
      ],
    });

    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };

    const competitionInfo = async () => {
      console.log("123");
    };

    const dataTitleClick = async (dataTitle) => {
      data.dataTitle = dataTitle;
      console.log(dataTitle);
    };

    const dataSubTitleClick = async (dataSubTitle) => {
      data.dataSubTitle = dataSubTitle;
    };

    return {
      data,
      homeDataList,
      onSwiper,
      onSlideChange,
      competitionInfo,
      dataTitleClick,
      dataSubTitleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
  display: none;
}
input[type="radio"] {
  display: none;
}

.play-btn {
  width: 20px;
  height: 18px;
}
.top-left-img {
  width: 320px;
}
.top-right-content {
  width: calc(100% - 320px);
}
</style>
