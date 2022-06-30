<template>
  <div class="flex flex-col items-center mx-auto container">
    <div class="w-full mt-8 h-40 border">輪播圖</div>

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
                  fill="green"
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

<script></script>

<style lang="scss" scoped></style>
