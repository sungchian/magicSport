<template>
  <div>
    <div>
      <h1 class="page-header">{{ t("$current.page.title") }}</h1>
      <!-- <button @click="switchVisible" v-if="!editState">
        {{ isVisable ? t("$field.info.invisible") : t("$field.info.visible") }}
      </button> -->
    </div>
    <div class="page-content">
      <div class="p-4 h-18">
        <label class="font-medium whitespace-nowrap flex items-center">
          {{ t("$field.account") }}
        </label>
        <div class="flex">
          <div class="flex items-center justify-center ml-20 w-40">
            <input
              type="text"
              class="form-control text-center"
              v-if="editState"
              v-model="data.info.account"
            />
            <div v-else>
              {{
                isVisable
                  ? data.info.account
                  : "*".repeat(data.info.account.length)
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 h-18">
        <label class="font-medium whitespace-nowrap flex items-center">
          {{ t("$field.password") }}
        </label>
        <div class="flex items-center justify-center ml-20 w-40">
          <input
            type="password"
            class="form-control text-center"
            :placeholder="'******'"
            v-if="editState"
            v-model="data.info.password"
          />
          <div v-else>
            {{ "******" }}
          </div>
        </div>
      </div>
      <div class="p-4 h-18">
        <label class="font-medium whitespace-nowrap flex items-center">
          {{ t("$field.username") }}
        </label>
        <div class="flex items-center justify-center ml-20 w-40">
          <input
            type="text"
            class="form-control text-center"
            v-if="editState"
            v-model="data.info.username"
          />
          <div v-else>{{ data.info.username }}</div>
        </div>
      </div>
      <div class="p-4 h-18">
        <label class="font-medium whitespace-nowrap flex items-center">
          {{ t("$field.albertName") }}
        </label>
        <div class="flex items-center justify-center ml-20 w-40">
          <input
            type="text"
            class="form-control text-center"
            v-if="editState"
            v-model="data.info.memberUsername"
          />
          <div v-else>{{ data.info.memberUsername }}</div>
        </div>
      </div>
      <div class="items-center p-4 h-32">
        <label class="font-medium whitespace-nowrap flex items-center">
          {{ t("$field.img") }}
        </label>
        <label
          class="button button--md button--primary w-20 h-10 absolute mt-4"
          v-if="editState"
        >
          <input
            type="file"
            class="hidden w-2/3 file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer file:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-200 to-gray-400 text-white/80 rounded-full cursor-pointer shadow-xl shadow-gray-300/60"
            @change="uploadMainImg"
          />
          <i class="fas fa-solid fa-upload"></i>
        </label>
        <div class="flex items-center justify-center ml-20 w-40">
          <img class="info-img" :src="data.info.img" />
        </div>
      </div>
      <div class="p-4">
        <label class="font-medium whitespace-nowrap flex items-center">
          {{ t("$field.admin") }}
        </label>
        <div class="flex items-center justify-center ml-20 w-40">
          {{ data.info.isSystemAdmin ? "是" : "否" }}
        </div>
      </div>
    </div>
    <div class="" v-if="!editState">
      <Button @click="onEdit">
        <span>{{ t("$current.button.edit") }}</span>
      </Button>
    </div>
    <div class="" v-else>
      <Button @click="onCancel">
        <span>{{ t("$current.button.cancel") }}</span>
      </Button>
      <Button class="ml-2" @click="onStore" type="red">
        <span>{{ t("$current.button.store") }}</span>
      </Button>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";

// component
import Button from "@/widgets/button";

export default {
  breadcrumb: ["MODULE_SETTING", "SETTING_USERINFO"],
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.setting.user-info",
      $field: "$current.field",
    });

    const isVisable = ref(false);

    // const switchVisible = () => {
    //   isVisable.value = !isVisable.value;
    // };

    const data = reactive({
      info: {
        account: " ",
      },
      temp: {},
    });

    const fetch = async () => {
      const res = await store.dispatch("setting/user-info/get/info");
      if (res.state === 0) {
        data.info = res.result === null ? [] : res.result;
      } else {
        data.info = [];
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.read.failed", {
            reason: "",
          }),
        });
      }
    };

    const editState = ref(false);
    const onEdit = () => {
      editState.value = true;
      data.temp = JSON.parse(JSON.stringify(data.info));
    };
    const onStore = async () => {
      const res = await store.dispatch(
        "setting/user-info/edit/info",
        data.info
      );
      if (res.state === 0) {
        store.commit("app/set/alert", {
          type: "success",
          message: t("feedback.update.success"),
        });
        editState.value = false;
        fetch();
      } else {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.update.failed", {
            reason: "",
          }),
        });
      }
    };
    const onCancel = () => {
      editState.value = false;
      data.info = JSON.parse(JSON.stringify(data.temp));
    };

    const formImg = ref();

    const uploadMainImg = async (image) => {
      let files = image.target.files || image.dataTransfer.files;
      if (!files.length) return;
      formImg.value = files;

      const res = await store.dispatch(
        "account/manager/upload",
        formImg.value[0]
      );
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.update.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
        return false;
      } else {
        data.info.img = res.result[0].url;
      }
    };

    onMounted(() => {
      fetch();
    });
    return {
      t,
      isVisable,
      // switchVisible,
      editState,
      onEdit,
      onStore,
      onCancel,
      data,
      uploadMainImg,
    };
  },
};
</script>

<style scoped>
.info-img {
  transition: all 0.3s ease-in-out;
  z-index: 1;
  padding: 0;
  max-width: 4.85rem;
  max-height: 4.85rem;
}
.info-img:hover {
  transform: scale(4);
  z-index: 2147483647;
}
</style>
