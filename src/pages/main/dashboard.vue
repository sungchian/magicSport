<template>
  <div class="px-40 flex flex-col items-center mx-auto container">
    <div class="w-full mt-8 h-40 border">輪播圖</div>

    <div class="flex w-full">
      <div class="w-2/3 pr-12">
        <div class="flex space-x-8 mt-8" v-for="i in 2" :key="i">
          <div style="width: 23em">
            <img
              class="object-cover w-full"
              style="height: 17em"
              src="../../assets/images/girl1.jpeg"
            />
            <div
              class="absolute truncate -translate-y-6 text-gray-300"
              style="width: 23em; background-color: rgba(0, 0, 0, 0.5)"
            >
              124341243412434124341243412124341243412434124341243412434434
            </div>
          </div>
          <ul class="p-2 first-line:text-2xl space-y-2" style="width: 31em">
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
            <div class="w-full line-clamp h-12">
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

    <div>
      <div>
        <div>
          <div>熱門視頻</div>
          <div></div>
        </div>

        <div>
          <div>比賽直播</div>
          <div></div>
        </div>
      </div>

      <div>
        <div>數據</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
