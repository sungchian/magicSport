<template>
  <Modal
    size="lg"
    :show="show"
    @update:show="onClose"
    @afterHidden="onAfterHidden"
    @afterShown="onAfterShown"
  >
    <template #title>{{ t("$current.create.title") }}</template>
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

        <div
          class="form-group form-group--required"
          :class="[invalid.categoryId.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.categoryName") }}
          </label>
          <Select
            v-model="form.categoryId"
            :placeholder="
              t('form.placeholder.select', {
                field: t('$current.categoryName'),
              })
            "
            :options="options.categoryId"
            input
          >
          </Select>
        </div>
        <div class="form-group relative">
          <label class="form-group__title">
            {{ t("$current.mainImg") }}
          </label>
          <label class="button button--md button--primary mr-1 w-2/3">
            <input
              type="file"
              class="hidden w-2/3 file:bg-gradient-to-b file:from-blue-500 file:to-blue-600 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:text-white file:cursor-pointer file:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-200 to-gray-400 text-white/80 rounded-full cursor-pointer shadow-xl shadow-gray-300/60"
              @change="uploadMainImg"
            />
            <i class="fas fa-solid fa-upload"></i>
          </label>

          <div class="h-12 absolute inline-block w-1/3">
            <img
              class="manage-img mx-auto max-h-full"
              :src="form.mainImg"
              alt=""
              :onerror="imgerror"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.isTop") }}
          </label>
          <Toggle
            v-model:checked="form.isTop"
            @update:checked="onToggle"
            label=""
          />
        </div>

        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.label") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.label') })
            "
            v-model="form.label"
          />
        </div>
        <!-- <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.auditStatus") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.auditStatus') })
            "
            v-model="form.auditStatus"
          />
        </div> -->
        <!-- <div
          class="form-group form-group--required"
          :class="[invalid.publisher.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.publisher") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.publisher') })
            "
            v-model="form.publisher"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.publisher.$invalid"
          >
            {{ t("$current.invalid.publisher") }}
          </p>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.approver") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.approver') })
            "
            v-model="form.approver"
          />
        </div> -->
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.type") }}
          </label>
          <Select
            v-model="form.type"
            :placeholder="
              t('form.placeholder.select', { field: t('$current.type') })
            "
            :options="options.types"
          >
          </Select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__title">
          {{ t("$current.tagTeam") }}
        </label>
        <Select
          class="w-1/4 inline-block"
          :placeholder="t('$current.sportType')"
          v-model="tagType.team"
          :options="options.sportTypes"
        />
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
          :readonly="tagType.team === ''"
          @click="tagAlert('team')"
        />
      </div>
      <div class="form-group">
        <label class="form-group__title">
          {{ t("$current.tagPlayer") }}
        </label>
        <Select
          class="w-1/4 inline-block"
          :placeholder="t('$current.sportType')"
          v-model="tagType.player"
          :options="options.sportTypes"
        />
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
          :readonly="tagType.player === ''"
          @click="tagAlert('player')"
        />
      </div>

      <div class="form-group w-full">
        <label class="form-group__title">
          {{ t("$current.articleContent") }}
        </label>
        <ckeditor
          v-model="form.articleContent"
          :editor="fullEditor"
          :config="editorConfig"
        ></ckeditor>
      </div>
    </template>
    <template #footer>
      <Button size="md" class="w-24" @click="onSubmit" async>
        {{ t("widgets.swal.confirm") }}
      </Button>
    </template>
  </Modal>
</template>
<script>
import { ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useVuelidate, { required } from "@/hooks/use-vuelidate";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import Toggle from "@/widgets/actions/toggle";
import Select from "@/widgets/select";
import SelectInput from "@/widgets/select-input";

/** helper */
import { map, sortWith, ascend, prop } from "ramda";

export default {
  name: "ArticleManageCreateModal",
  props: {
    show: Boolean,
    sportTypes: Array,
    fullEditor: Function,
    editorConfig: Object,
    articleTypes: Array,
  },
  components: {
    Button,
    Modal,
    Toggle,
    Select,
    SelectInput,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix("pages.article.manage.form");

    const form = reactive({
      approver: store.state.auth.user.memberId,
      articleContent: "",
      auditStatus: 1,
      categoryId: "",
      greatCount: "",
      isTop: false,
      label: "",
      mainImg: "",
      publisher: store.state.auth.user.memberId,
      shortContent: "",
      tagPlayer: [],
      tagTeam: [],
      title: "",
      type: 2,
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
      publisher: { required },
      title: { required },
      shortContent: { required },
      categoryId: { required },
    };
    const messages = {
      publisher: { required: t("form.valid.required") },
      title: { required: t("form.valid.required") },
      categoryId: { required: t("form.valid.required") },
      shortContent: { required: t("form.valid.required") },
    };

    const v = useVuelidate(rules, form, messages);

    const onAfterShown = async () => {
      const conditions = reactive({
        pageIndex: 1,
        pageSize: 100,
      });
      const res = await store.dispatch(
        "article/category/article/category",
        conditions
      );

      if (res.state === 0) {
        const categorySort = sortWith([ascend(prop("sort"))]);
        options.categoryId = map(
          (category) => ({ value: category.id, children: category.name }),
          categorySort(res.result.rows).filter((c) => c.isDisabled === false)
        );
        options.types = map(
          (type) => ({ value: type.id, children: type.name }),
          props.articleTypes
        );
        options.sportTypes = map(
          (type) => ({ value: type.id, children: type.name }),
          props.sportTypes
        );
      } else {
        options.categoryId = [];
        options.types = [];
        options.sportTypes = [];
        options.tagPlayer = [];
        options.tagTeam = [];
        // 可以加上sweetAlert
        tagType.team = "";
        tagType.player = "";
      }
    };

    const onAfterHidden = () => {
      v.value.$reset();
      form.approver = store.state.auth.user.memberId;
      form.articleContent = "";
      form.auditStatus = 1;
      form.categoryId = "";
      form.greatCount = "";
      form.isTop = false;
      form.label = "";
      form.mainImg = "";
      form.publisher = store.state.auth.user.memberId;
      form.shortContent = "";
      form.tagPlayer = [];
      form.tagTeam = [];
      form.title = "";
      form.type = 2;
      options.categoryId = [];
      options.types = [];
      options.sportTypes = [];
      options.tagPlayer = [];
      options.tagTeam = [];
      tagType.team = "";
      tagType.player = "";
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

    const onClose = () => {
      emit("update:show", false);
    };

    const onSubmit = async (done) => {
      v.value.$touch();
      if (v.value.$invalid) {
        done();
        return false;
      }

      form.auditStatus = +form.auditStatus;
      form.greatCount = +form.greatCount;

      const res = await store.dispatch("article/manage/create", form);
      done();
      onClose();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.create.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
        return false;
      }

      store.commit("app/set/alert", {
        type: "success",
        message: t("feedback.create.success"),
      });
      emit("success");
    };

    const onToggle = (display) => {
      form.isTop = display;
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
        if (res.result === null) {
          options.tagTeam = [];
        } else {
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
        if (res.result === null) {
          options.tagTeam = [];
        } else {
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
        if (res.result === null) {
          options.tagPlayer = [];
        } else {
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
        if (res.result === null) {
          options.tagPlayer = [];
        } else {
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

    const tagAlert = (tag) => {
      if (tagType.team === "" && tag === "team") {
        store.commit("app/set/alert", {
          type: "danger",
          message: "請先選擇球種！",
        });
      } else if (tagType.player === "" && tag === "player") {
        store.commit("app/set/alert", {
          type: "danger",
          message: "請先選擇球種！",
        });
      } else {
        return;
      }
    };

    /** 有換球種後面的資料就清空 */
    watch(
      () => tagType.team,
      () => {
        options.tagTeam = [];
      }
    );

    watch(
      () => tagType.player,
      () => {
        options.tagPlayer = [];
      }
    );

    return {
      t,
      form,
      options,
      tagType,
      invalid: v.value,
      onAfterShown,
      onAfterHidden,
      onClose,
      onSubmit,
      onToggle,
      uploadMainImg,
      searchForTeamTag,
      searchForPlayerTag,
      tagAlert,
    };
  },
};
</script>

<style scoped>
/* input[type="file"] {
  display: none;
} */

.manage-img {
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 2147483647;
}
.manage-img:hover {
  transform: scale(10);
}
</style>
