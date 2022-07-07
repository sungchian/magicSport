<template>
  <div class="container m-auto flex pt-8">
    <the-live-nav class="w-1/6 mr-10"></the-live-nav>
    <div class="right w-5/6">
      <div class="block-title flex justify-between border-b-2">
        <span class="tit-text inline-block">{{ t("$field.live") }}</span>
        <div class="w-32">
          <DatetimePicker
            v-model="form.date"
            :placeholder="
              t('form.placeholder.input', {
                field: t('$field.date'),
              })
            "
            tools:today
            tools:clear
            no:time
            input
          />
        </div>
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
            :class="{ 'bg-[#FAFAFA]': row % 2 }"
            v-for="row in 5"
            :key="`row-${row}`"
            @click="competitionInfo"
          >
            <td class="text-center w08">time</td>
            <td class="text-center w08">round</td>
            <td class="text-center h-full">
              <div class="flex justify-end items-center">
                <div class="w08">teamA&nbsp;&nbsp;</div>
                <img
                  src="../../assets/images/flag.png"
                  alt=""
                  class="team-pic h-full"
                />
              </div>
            </td>
            <td class="text-center w08">vs-score</td>
            <td class="text-center h-full">
              <div class="flex justify-start">
                <img
                  src="../../assets/images/flag.png"
                  alt=""
                  class="team-pic h-full"
                />
                <div class="w08">&nbsp;&nbsp;teamB</div>
              </div>
            </td>

            <td class="text-center w09">{{ t("$field.explanation") }}</td>
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
import DatetimePicker from "@/widgets/datetime-picker";
import Table from "@/widgets/table";

export default {
  components: {
    DatetimePicker,
    Table,
  },
  setup() {
    // const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.live._id",
      $field: "$current.field",
    });

    const conditions = reactive({
      filter: [
        "account",
        "username",
        "isEnable",
        "isSystemAdmin",
        "created",
        "updated",
        "createdBy",
        "updatedBy",
      ],
      pageIndex: 1,
      pageSize: 20,
      sortName: "sort",
      sortBy: "desc",
    });

    const data = reactive({
      total: 0,
      list: [],
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

    const competitionInfo = async (e) => {
      const url = router.resolve({
        name: "/main/dashboard",
        params: { id: e },
      });
      window.open(url.href, "_blank");
    };

    return {
      t,
      conditions,
      data,
      modal,
      fetch,
      form,
      competitionInfo,
    };
  },
};
</script>
