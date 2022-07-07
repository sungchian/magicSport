<template>
  <div class="container m-auto flex pt-8">
    <the-live-nav class="w-1/6 mr-10"></the-live-nav>
    <div class="right w-5/6">
      <div class="block-title flex justify-between border-b-2">
        <ul class="flex justify-around w-full p-2">
          <li
            v-for="i in data.subTab"
            :key="i.id"
            class="data-list-title-item flex w04"
            @click="dataSubTitleClick(i.id)"
          >
            <label
              :for="i.id"
              class="cursor-pointer"
              :class="{ w05: i.id === data.subTab }"
            >
              <input type="checkbox" :checked="i.id === data.subTab" />
              <span>{{ i.subTab }}</span>
            </label>
          </li>
        </ul>
      </div>
      <Table>
        <div
          class="group-title bg-[#16B13A] w-full h-12 flex items-center justify-center"
        >
          {{ t("$field.competition") }}
        </div>
        <template #thead>
          <tr>
            <th scope="col">
              {{ t("$field.rank") }}
            </th>
            <th scope="col">
              {{ t("$field.team") }}
            </th>
            <th scope="col">
              {{ t("$field.session") }}
            </th>
            <th scope="col">
              {{ t("$field.win") }}
            </th>
            <th scope="col">
              {{ t("$field.tie") }}
            </th>
            <th scope="col">
              {{ t("$field.lose") }}
            </th>
            <th scope="col">
              {{ t("$field.get") }}
            </th>
            <th scope="col">
              {{ t("$field.lost") }}
            </th>
            <th scope="col">
              {{ t("$field.got") }}
            </th>
            <th scope="col">
              {{ t("$field.point") }}
            </th>
          </tr>
        </template>
        <template #tbody>
          <tr
            class="hover:bg-gray-200 h-16 cursor-pointer"
            :class="{ 'bg-[#FAFAFA]': row % 2, 'bg-[#DCF3E2]': row < 4 }"
            v-for="row in 18"
            :key="`row-${row}`"
            @click="moreInfo"
          >
            <td class="text-center w08">{{ row }}</td>
            <td class="text-center h-full">
              <div class="flex justify-center">
                <img
                  src="../../assets/images/flag.png"
                  alt=""
                  class="team-pic h-full"
                />
                <div class="w08">&nbsp;&nbsp;teamB</div>
              </div>
            </td>
            <td class="text-center w08">8</td>
            <td class="text-center w08">7</td>
            <td class="text-center w08">8</td>
            <td class="text-center w08">8</td>
            <td class="text-center w08">8</td>
            <td class="text-center w08">8</td>
            <td class="text-center w08">8</td>
            <td class="text-center w08">8</td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
// import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import router from "@/router";
/** components */
import Table from "@/widgets/table";

export default {
  components: {
    Table,
  },
  setup() {
    // const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.data._id",
      $field: "$current.field",
    });

    const data = reactive({
      total: 0,
      list: [],
      subTab: [
        { id: 1, subTab: "积分" },
        { id: 2, subTab: "射手榜" },
        { id: 3, subTab: "助攻榜" },
        { id: 4, subTab: "赛程" },
      ],
    });

    const form = reactive({
      date: "",
    });

    const modal = reactive({
      create: false,
      update: false,
      updateData: {},
    });

    const fetch = async () => {
      // const res = await store.dispatch("account/manager/read/list", conditions);
      // if (res.state === 0) {
      //   data.list = res.result.rows === null ? [] : res.result.rows;
      //   data.total = res.result.totalPages;
      // } else {
      //   data.list = [];
      //   data.total = 0;
      // }
    };

    onMounted(() => {
      fetch();
    });

    const moreInfo = async (e) => {
      const url = router.resolve({
        name: "/main/dashboard",
        params: { id: e },
      });
      window.open(url.href, "_blank");
    };

    return {
      t,
      data,
      modal,
      fetch,
      form,
      moreInfo,
    };
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}
input[type="radio"] {
  display: none;
}
</style>
