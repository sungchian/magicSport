<template>
  <Modal
    size="lg"
    :show="show"
    @update:show="onClose"
    @afterHidden="onAfterHidden"
    @afterShown="onAfterShown"
  >
    <template #title>{{ t("$current.display.title") }}</template>
    <template #body>
      <div class="grid grid-cols-3 gap-4">
        <div
          class="form-group form-group--required"
          :class="[invalid.title.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.title") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.title') })
            "
            v-model="form.title"
          />
          <p class="form-group__invalid-message" v-if="invalid.title.$invalid">
            {{ t("$current.invalid.title") }}
          </p>
        </div>
        <div
          class="form-group form-group--required"
          :class="[invalid.shortContent.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.shortContent") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.shortContent') })
            "
            v-model="form.shortContent"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.shortContent.$invalid"
          >
            {{ t("$current.invalid.shortContent") }}
          </p>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.label") }}
          </label>
          <input type="text" class="form-control" v-model="form.label" />
        </div>
        <div class="form-group relative">
          <label class="form-group__title">
            {{ t("$current.mainImg") }}
          </label>
          <div class="h-12 w-1/3">
            <img
              class="manage-img mx-auto max-h-full"
              :src="form.mainImg"
              alt=""
              :onerror="imgerror"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__title">
          {{ t("$current.tagTeam") }}
        </label>
        <SelectInput
          class="w-3/4 inline-block"
          :placeholder="
            t('form.placeholder.select', { field: t('$current.tagTeam') })
          "
          v-model="form.tagTeam"
          :options="options.tagTeam"
          :tagSportType="tagType.team"
          input
          @search="searchForTeamTag"
        />
      </div>
      <div class="form-group">
        <label class="form-group__title">
          {{ t("$current.tagPlayer") }}
        </label>
        <SelectInput
          class="w-3/4 inline-block"
          :placeholder="
            t('form.placeholder.select', { field: t('$current.tagPlayer') })
          "
          v-model="form.tagPlayer"
          :options="options.tagPlayer"
          :tagSportType="tagType.player"
          input
          @search="searchForPlayerTag"
        />
      </div>

      <div class="form-group w-full">
        <label class="form-group__title">
          {{ t("$current.articleContent") }}
        </label>
        <ckeditor
          v-model="form.articleContent"
          @input="delayForSave"
          :editor="fullEditor"
          :config="editorConfig"
        ></ckeditor>
      </div>
    </template>
    <template #footer>
      <Button
        size="md"
        class="w-24"
        :class="{ 'button--disabled': isDisabled }"
        @click="onClose"
        async
      >
        {{ t("widgets.swal.confirm") }}
      </Button>
    </template>
  </Modal>
</template>
<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useVuelidate, { required } from "@/hooks/use-vuelidate";
import { map } from "ramda";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import SelectInput from "@/widgets/select-input";

export default {
  name: "DisplayModal",
  props: {
    show: Boolean,
    data: Object,
    sportTypes: Array,
    fullEditor: Function,
    editorConfig: Object,
    articleTypes: Array,
  },
  components: {
    Button,
    Modal,
    SelectInput,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({ $current: "pages.article.slide.form" });

    const form = reactive({
      approver: "",
      articleContent: "",
      auditStatus: 0,
      categoryId: "",
      greatCount: "",
      id: "",
      isTop: false,
      label: "",
      mainImg: "",
      publisher: "",
      shortContent: "",
      tagPlayer: [],
      tagTeam: [],
      title: "",
      type: 0,
    });

    const options = reactive({
      categoryId: [],
      types: [],
      sportTypes: [],
      tagPlayer: [],
      tagTeam: [],
    });

    const tagType = reactive({
      team: "",
      player: "",
    });

    const rules = {
      //前面是元件，後面是自定義條件
      categoryId: { required },
      publisher: { required },
      shortContent: { required },
      title: { required },
    };
    const messages = {
      categoryId: { required: t("form.valid.required") },
      publisher: { required: t("form.valid.required") },
      shortContent: { required: t("form.valid.required") },
      title: { required: t("form.valid.required") },
    };
    const v = useVuelidate(rules, form, messages);

    const onAfterShown = async () => {
      form.approver = props.data.approver;
      form.articleContent = props.data.articleContent;
      form.auditStatus = props.data.auditStatus;
      form.categoryId = props.data.categoryId;
      form.greatCount = props.data.greatCount;
      form.id = props.data.id;
      form.isTop = props.data.isTop;
      form.label = props.data.label;
      form.mainImg = props.data.mainImg;
      form.publisher = props.data.publisher;
      form.shortContent = props.data.shortContent;
      form.type = props.data.type;
      form.tagTeam = props.data.tagTeam ? props.data.tagTeam.split(",") : [];
      form.tagPlayer = props.data.tagPlayer
        ? props.data.tagPlayer.split(",")
        : [];
      form.title = props.data.title;
    };

    const onAfterHidden = () => {
      v.value.$reset();
      form.approver = "";
      form.articleContent = "";
      form.auditStatus = "";
      form.categoryId = "";
      form.greatCount = "";
      form.id = "";
      form.isTop = false;
      form.label = "";
      form.mainImg = "";
      form.publisher = "";
      form.shortContent = "";
      form.tagPlayer = [];
      form.tagTeam = [];
      form.title = "";
      form.type = "";
      options.categoryId = [];
      options.types = [];
      options.sportTypes = [];
      options.tagPlayer = [];
      options.tagTeam = [];
      tagType.team = "";
      tagType.player = "";
    };

    const onClose = () => {
      emit("update:show", false);
    };

    const onToggle = (display) => {
      form.isTop = display;
    };

    const imgerror = (event) => {
      // event.currentTarget.src = require("../../../../");
      console.log(event);
      // event.currentTarget.src =
      //   "https://d25ktuez36ppw3.cloudfront.net/img/articles/fifa234234.jpg";
      // return true;
    };

    const formImg = ref();

    const uploadMainImg = async (image) => {
      let files = image.target.files || image.dataTransfer.files;
      if (!files.length) return;
      formImg.value = files;

      const res = await store.dispatch(
        "article/manage/upload",
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
        // eslint-disable-next-line require-atomic-updates
        form.mainImg = res.result[0].url;
      }
    };

    let isDisabled = ref(false);

    const delayForSave = async () => {
      isDisabled.value = true;
      await setInterval(() => {
        isDisabled.value = false;
      }, 1500);
    };

    const searchForTeamTag = async (input) => {
      if (input === "") return;
      if (tagType.team === "") {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.update.failed", {
            reason: "球類選擇錯誤",
          }),
        });
        return;
      }
      if (tagType.team === 1) {
        const res = await store.dispatch(
          "article/manage/search/football/team",
          {
            str: input,
          }
        );
        if (res.state !== 0) return;
        else {
          options.tagTeam = map(
            (tag) => ({ value: tag.id, children: tag.name_zht }),
            res.result
          );
        }
      } else if (tagType.team === 2) {
        //先清空result  還沒做
        const res = await store.dispatch(
          "article/manage/search/basketball/team",
          {
            str: input,
          }
        );
        if (res.state !== 0) return;
        else {
          options.tagTeam = map(
            (tag) => ({ value: tag.id, children: tag.name_zht }),
            res.result
          );
        }
      } else {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.update.failed", {
            reason: "球類選擇錯誤",
          }),
        });
      }
    };

    const searchForPlayerTag = async (input) => {
      if (input === "") return;
      if (tagType.player === "") {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.update.failed", {
            reason: "球類選擇錯誤",
          }),
        });
        return;
      }
      if (tagType.player === 1) {
        const res = await store.dispatch(
          "article/manage/search/football/player",
          {
            str: input,
          }
        );
        if (res.state !== 0) return;
        else {
          options.tagPlayer = map(
            (tag) => ({ value: tag.id, children: tag.name_zht }),
            res.result
          );
        }
      } else if (tagType.player === 2) {
        //先清空result  還沒做
        const res = await store.dispatch(
          "article/manage/search/basketball/player",
          {
            str: input,
          }
        );
        if (res.state !== 0) return;
        else {
          options.tagPlayer = map(
            (tag) => ({ value: tag.id, children: tag.name_zht }),
            res.result
          );
        }
      } else {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.update.failed", {
            reason: "球類選擇錯誤",
          }),
        });
      }
    };

    return {
      t,
      form,
      options,
      tagType,
      invalid: v.value,
      onAfterShown,
      onAfterHidden,
      onClose,
      onToggle,
      uploadMainImg,
      delayForSave,
      isDisabled,
      imgerror,
      searchForTeamTag,
      searchForPlayerTag,
    };
  },
};
</script>

<style scoped>
.manage-img {
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 2147483647;
}
.manage-img:hover {
  transform: scale(10);
}
</style>
