<template>
  <ul>
    <li v-for="node in data.list" :key="node.id" class="mb-1">
      <router-link
        :to="`/live/${node.id}`"
        class="text-base text-gray-900 font-normal rounded-lg whitespace-nowrap flex items-center p-2"
        :class="{
          'bg-gray-200': `/live/${node.id}` === key,
          'hover:bg-gray-100': `/live/${node.id}` !== key,
        }"
      >
        {{ node.ballardCompetitionName }}
      </router-link>
    </li>
  </ul>
</template>
<script>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import { useRoute } from "vue-router";

import { sortWith, ascend, prop } from "ramda";
/** helper */

export default {
  name: "TheLiveNav",
  // 這邊先寫死旁邊的list, 後續有需要動態在更改為prop傳入dataList
  props: {},
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const route = useRoute();
    console.log(route);
    console.log(store.state.route.path);
    const key = computed(() => store.state.route.path);

    const data = reactive({
      list: [],
    });

    const getLiveNav = async () => {
      const res = await store.dispatch("live/_id/read/competitionList");
      if (res.statusCode === 200) {
        const listSort = sortWith([ascend(prop("sort"))]);
        data.list = res.result === null ? [] : listSort(res.result);
        console.log(data.list);
      } else {
        data.list = [];
      }
    };

    onMounted(() => {
      getLiveNav();
    });

    return {
      t,
      key,
      data,
      getLiveNav,
    };
  },
};
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  border-left: solid 10px green;
  color: green;
}
</style>
