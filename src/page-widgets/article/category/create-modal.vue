<template>
  <Modal
    size="md"
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
          :class="[invalid.name.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.category") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.category') })
            "
            v-model="form.name"
          />
          <p class="form-group__invalid-message" v-if="invalid.name.$invalid">
            {{ invalid.name.$errors[0]?.$message }}
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
import { reactive } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useVuelidate, { required } from "@/hooks/use-vuelidate";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";

export default {
  name: "ArticleManageCreateModal",
  props: {
    show: Boolean,
  },
  components: {
    Button,
    Modal,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix("pages.article.category.form");
    const form = reactive({
      name: "",
    });
    const rules = {
      name: { required },
    };
    const messages = {
      name: { required: t("form.valid.required") },
    };

    const v = useVuelidate(rules, form, messages);

    const onAfterShown = async () => {};

    const onAfterHidden = () => {
      v.value.$reset();
      form.name = "";
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

      const res = await store.dispatch("article/category/create", form);
      done();
      onClose();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.create.failed", {
            reason: t(`error.${res.error.message}`),
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

    return {
      t,
      form,
      invalid: v.value,
      onAfterShown,
      onAfterHidden,
      onClose,
      onSubmit,
    };
  },
};
</script>
