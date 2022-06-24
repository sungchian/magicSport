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
      <div class="grid grid-cols-2 gap-4">
        <div
          class="form-group form-group--required"
          :class="[invalid.categoryId.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.categoryId") }}
          </label>
          <Select
            v-model="form.categoryId"
            :placeholder="
              t('form.placeholder.select', { field: t('$current.categoryId') })
            "
            :options="options.categoryId"
            input
            @changed="cleanArticleId"
          >
          </Select>
          <p
            class="form-group__invalid-message"
            v-if="invalid.categoryId.$invalid"
          >
            {{ t("$current.invalid.categoryId") }}
          </p>
        </div>
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

        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.type") }}
          </label>
          <Select
            v-model="form.kind"
            :placeholder="
              t('form.placeholder.select', { field: t('$current.type') })
            "
            :options="[
              {
                value: 1,
                children: '文章',
              },
              {
                value: 2,
                children: '連結',
              },
            ]"
          >
          </Select>
        </div>

        <div
          v-if="form.kind === 2"
          class="form-group"
          :class="[
            (invalid.link.$invalid && 'form-group--invalid') ||
              (form.articleId === '' && 'form-group--required'),
          ]"
        >
          <label class="form-group__title">
            {{ t("$current.link") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.link') })
            "
            v-model="form.link"
          />
          <p class="form-group__invalid-message" v-if="invalid.link.$invalid">
            {{ t("$current.invalid.link") }}
          </p>
        </div>

        <div
          v-else
          class="form-group"
          :class="[
            (invalid.articleId.$invalid && 'form-group--invalid') ||
              (form.link === '' && 'form-group--required'),
          ]"
        >
          <label class="form-group__title">
            {{ t("$current.articleId") }}
          </label>
          <!-- <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.articleId') })
            "
            v-model="form.articleId"
          /> -->
          <SelectInput
            :placeholder="
              t('form.placeholder.select', { field: t('$current.articleId') })
            "
            v-model="form.articleId"
            :options="options.articleId"
            input
            @search="searchForArticle"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.articleId.$invalid"
          >
            {{ t("$current.invalid.articleId") }}
          </p>
        </div>

        <div
          class="form-group relative form-group--required"
          :class="[invalid.picUrl.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.picUrl") }}
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
              :src="form.picUrl"
              alt=""
              :onerror="imgerror"
            />
          </div>
          <p class="form-group__invalid-message" v-if="invalid.picUrl.$invalid">
            {{ t("$current.invalid.picUrl") }}
          </p>
        </div>

        <div
          class="form-group form-group--required"
          :class="[
            (invalid.releaseDatetime.$invalid && 'form-group--invalid') ||
              (invalid.expirationDatetime.$invalid && 'form-group--invalid'),
          ]"
        >
          <label class="form-group__title">
            {{ t("$current.datetime") }}
          </label>
          <div class="flex" style="justify-content: space-between">
            <DatetimePicker
              style="width: 45%"
              v-model="form.releaseDatetime"
              :placeholder="
                t('form.placeholder.input', {
                  field: t('$current.releaseDatetime'),
                })
              "
              tools:today
              tools:clear
              input
            />
            <span>&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;</span>
            <DatetimePicker
              style="width: 45%"
              v-model="form.expirationDatetime"
              :placeholder="
                t('form.placeholder.input', {
                  field: t('$current.expirationDatetime'),
                })
              "
              tools:today
              tools:clear
              input
            />
          </div>
          <p
            class="form-group__invalid-message"
            v-if="invalid.releaseDatetime.$invalid"
          >
            {{ t("$current.invalid.releaseDatetime") }}
          </p>
          <p
            class="form-group__invalid-message"
            v-else-if="invalid.expirationDatetime.$invalid"
          >
            {{ t("$current.invalid.expirationDatetime") }}
          </p>
        </div>
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
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useVuelidate, { required, requiredIf } from "@/hooks/use-vuelidate";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import Select from "@/widgets/select";
import DatetimePicker from "@/widgets/datetime-picker";
import SelectInput from "@/widgets/select-input";

/** helper */
import { map, sortWith, ascend, prop } from "ramda";

export default {
  name: "ArticleManageCreateModal",
  props: {
    show: Boolean,
  },
  components: {
    Button,
    Modal,
    Select,
    SelectInput,
    DatetimePicker,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix("pages.article.slide.form");

    const form = reactive({
      articleId: "",
      categoryId: "",
      link: "",
      picUrl: "",
      title: "",
      kind: 1,
      releaseDatetime: "",
      expirationDatetime: "",
    });

    const options = reactive({
      categoryId: [],
      articleId: [],
    });

    const rules = {
      title: { required },
      categoryId: { required },
      picUrl: { required },
      articleId: {
        required: requiredIf(() => form.link === ""),
      },
      link: {
        required: requiredIf(() => form.articleId === ""),
      },
      releaseDatetime: { required },
      expirationDatetime: { required },
    };
    const messages = {
      title: { required: t("form.valid.required") },
      categoryId: { required: t("form.valid.required") },
      picUrl: { required: t("form.valid.required") },
      articleId: { required: t("form.valid.required") },
      link: { required: t("form.valid.required") },
      releaseDatetime: { required: t("form.valid.required") },
      expirationDatetime: { required: t("form.valid.required") },
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
      } else {
        options.categoryId = [];
      }
    };

    const onAfterHidden = () => {
      v.value.$reset();
      form.articleId = "";
      form.categoryId = "";
      form.link = "";
      form.kind = 1;
      form.picUrl = "";
      form.title = "";
      form.releaseDatetime = "";
      form.expirationDatetime = "";
      options.categoryId = [];
      options.articleId = [];
    };

    const formImg = ref();

    const uploadMainImg = async (image) => {
      let files = image.target.files || image.dataTransfer.files;
      if (!files.length) return;
      formImg.value = files;

      const res = await store.dispatch(
        "article/slide/upload",
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
        form.picUrl = res.result[0].url;
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

      form.releaseDatetime = form.releaseDatetime
        ? form.releaseDatetime.replace(" ", "T") + "Z"
        : "";
      form.expirationDatetime = form.expirationDatetime
        ? form.expirationDatetime.replace(" ", "T") + "Z"
        : "";

      if (form.kind === 1) {
        form.link = "";
      } else {
        form.articleId = "";
      }

      form.articleId = form.articleId.value ? form.articleId.value : "";

      const res = await store.dispatch("article/slide/create", form);
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

    const cleanArticleId = async () => {
      form.articleId = "";
    };

    const searchForArticle = async (input) => {
      if (input === "") return;
      if (form.categoryId === "") {
        store.commit("app/set/alert", {
          type: "danger",
          message: "請先選擇文章類別",
        });
        return;
      } else {
        const res = await store.dispatch("article/slide/getArticles", {
          categoryId: form.categoryId,
          keyword: input,
        });
        if (res.state !== 0) return;
        if (res.result === null) {
          options.articleId = [];
        } else {
          options.articleId = map(
            (tag) => ({ value: tag.id, children: tag.title }),
            res.result
          );
        }
      }
    };

    return {
      t,
      form,
      options,
      invalid: v.value,
      onAfterShown,
      onAfterHidden,
      onClose,
      onSubmit,
      uploadMainImg,
      cleanArticleId,
      searchForArticle,
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
  transform: scale(5);
}
</style>
