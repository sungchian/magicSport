<template>
  <div class="container m-auto flex">
    <the-live-nav class="w-1/6 mr-10"></the-live-nav>
    <div class="right w-5/6">
      <div class="block-title h-20 flex justify-between border-b-2">
        <span class="tit-text inline-block">比賽直播</span>
        <div class="w-64">
          <DatetimePicker
            v-model="form.date"
            placeholder="請選擇..."
            tools:today
            tools:clear
            no:time
          />
        </div>
      </div>
      <div class="list-data">
        <div class="match-list h-auto">
          <p class="date">
            <img src="" alt="" />
            2020-06-30
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";

/** components */
import DatetimePicker from "@/widgets/datetime-picker";

export default {
  components: {
    DatetimePicker,
  },
  setup() {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.account.manager",
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
      const res = await store.dispatch("account/manager/read/list", conditions);
      if (res.state === 0) {
        data.list = res.result.rows === null ? [] : res.result.rows;
        data.total = res.result.totalPages;
      } else {
        data.list = [];
        data.total = 0;
      }
    };

    onMounted(() => {
      fetch();
    });

    const currentNavs = reactive([
      {
        code: "123",
        children: [],
        path: "/account/member",
        icon: "fas fa-user fa-fw",
      },
      {
        code: "456",
        children: [],
        path: "/account/member",
        icon: "fas fa-user fa-fw",
      },
    ]);

    return {
      t,
      conditions,
      data,
      modal,
      fetch,
      form,
      currentNavs,
    };
  },
};
</script>
