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
          :class="[invalid.content.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.content") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', {
                field: t('$current.content'),
              })
            "
            v-model="form.content"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.content.$invalid"
          >
            {{ invalid.content.$errors[0]?.$message }}
          </p>
        </div>
        <div
          class="form-group form-group--required"
          :class="[invalid.type.$invalid && 'form-group--invalid']"
        >
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
          <p class="form-group__invalid-message" v-if="invalid.type.$invalid">
            {{ invalid.type.$errors[0]?.$message }}
          </p>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.isEnable") }}
          </label>
          <Toggle
            v-model:checked="form.isEnable"
            @update:checked="onToggle"
            label=""
          />
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
import Toggle from "@/widgets/actions/toggle";
import Select from "@/widgets/select";

/** helper */
import { map } from "ramda";

export default {
  name: "ArticleManageCreateModal",
  props: {
    show: Boolean,
    chatfilter: Array,
  },
  components: {
    Button,
    Modal,
    Toggle,
    Select,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix("pages.ball.chatfilter.form");
    const form = reactive({
      content: "",
      type: "",
      isEnable: true,
    });

    const options = reactive({
      types: [],
    });

    const rules = {
      content: { required },
      type: { required },
    };
    const messages = {
      content: { required: t("form.valid.required") },
      type: { required: t("form.valid.required") },
    };

    const v = useVuelidate(rules, form, messages);

    const onAfterShown = async () => {
      options.types = map(
        (type) => ({ value: type.id, children: type.name }),
        props.chatfilter
      );
    };

    const onAfterHidden = () => {
      v.value.$reset();
      form.content = "";
      form.type = "";
      form.isEnable = true;
      options.types = [];
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

      form.type = +form.type;

      const res = await store.dispatch("ball/chatfilter/create", form);
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
      form.isEnable = display;
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
      onToggle,
    };
  },
};
</script>
