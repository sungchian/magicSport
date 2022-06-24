<template>
  <Modal
    size="md"
    :show="show"
    @update:show="onClose"
    @afterHidden="onAfterHidden"
    @afterShown="onAfterShown"
  >
    <template #title>{{ t("$current.update.title") }}</template>
    <template #body>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.id") }}
          </label>
          <input
            type="text"
            class="form-control"
            v-model="form[0].id"
            readonly
          />
        </div>
        <div
          class="form-group form-group--required"
          :class="[nameInvalid ? 'form-group--invalid' : '']"
        >
          <label class="form-group__title">
            {{ t("$current.name") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.name') })
            "
            v-model="form[0].name"
          />
          <p class="form-group__invalid-message" v-if="form[0].name == ''">
            {{ t("$current.invalid.name") }}
          </p>
        </div>
        <div
          class="form-group form-group--required"
          :class="[sortInvalid ? 'form-group--invalid' : '']"
        >
          <label class="form-group__title">
            {{ t("$current.sort") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.sort') })
            "
            v-model="form[0].sort"
          />
          <p class="form-group__invalid-message" v-if="form[0].sort == ''">
            {{ t("$current.invalid.sort") }}
          </p>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.isDisabled") }}
          </label>
          <Toggle :checked="!form[0].isDisabled" @update:checked="onToggle" />
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import Toggle from "@/widgets/actions/toggle";

export default {
  name: "ArticleCategoryUpdateModal",
  props: {
    show: Boolean,
    data: Object,
  },
  components: {
    Button,
    Modal,
    Toggle,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({ $current: "pages.article.category.form" });
    const form = ref([
      {
        id: computed(() => props.id),
        name: "",
        sort: 0,
        isDisabled: false,
      },
    ]);

    const onAfterShown = async () => {
      form.value[0] = {
        id: props.data.id,
        name: props.data.name,
        sort: props.data.sort,
        isDisabled: props.data.isDisabled,
        updatedAt: props.data.updatedAt,
      };
    };

    const onAfterHidden = () => {
      form.value[0].id = "";
      form.value[0].name = "";
      form.value[0].sort = "";
      form.value[0].isDisabled = "";
    };

    const onClose = () => {
      emit("update:show", false);
    };

    const nameInvalid = ref(false);
    const sortInvalid = ref(false);

    const onSubmit = async (done) => {
      if (form.value[0].name === "") {
        nameInvalid.value = true;
        done();
        return false;
      }
      if (form.value[0].sort === "") {
        sortInvalid.value = true;
        done();
        return false;
      }
      nameInvalid.value = false;
      sortInvalid.value = false;
      form.value[0].sort = +form.value[0].sort;

      const res = await store.dispatch("article/category/update", form.value);

      done();
      onClose();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.update.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
        return false;
      }

      store.commit("app/set/alert", {
        type: "success",
        message: t("feedback.update.success.with.describe", {
          describe: t("$current.update.success", { name: form.value[0].name }),
        }),
      });

      res.result[0].updatedAt = res.result[0].updatedAt.substring(0, 19);
      emit("success", res.result[0]);
    };

    const onToggle = (display) => {
      form.value[0].isDisabled = !display;
    };

    return {
      t,
      form,
      nameInvalid,
      sortInvalid,
      onAfterShown,
      onAfterHidden,
      onClose,
      onSubmit,
      onToggle,
    };
  },
};
</script>
