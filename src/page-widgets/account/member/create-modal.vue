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
          :class="[invalid.account.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.account") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.account') })
            "
            v-model="form.account"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.account.$invalid"
          >
            {{ t("$current.invalid.account") }}
          </p>
        </div>

        <div
          class="form-group form-group--required"
          :class="[invalid.username.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.username") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.username') })
            "
            v-model="form.username"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.username.$invalid"
          >
            {{ t("$current.invalid.username") }}
          </p>
        </div>

        <div
          class="form-group form-group--required"
          :class="[invalid.password.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.password") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', { field: t('$current.password') })
            "
            v-model="form.password"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.password.$invalid"
          >
            {{ t("$current.invalid.password") }}
          </p>
        </div>

        <div
          class="form-group form-group--required"
          :class="[invalid.sex.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.sex") }}
          </label>
          <Select
            v-model="form.sex"
            :placeholder="
              t('form.placeholder.select', { field: t('$current.sex') })
            "
            :options="[
              {
                value: 0,
                children: '男',
              },
              {
                value: 1,
                children: '女',
              },
            ]"
          >
          </Select>
          <p class="form-group__invalid-message" v-if="invalid.sex.$invalid">
            {{ t("$current.invalid.sex") }}
          </p>
        </div>

        <div
          class="form-group form-group--required"
          :class="[invalid.birthday.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.birthday") }}
          </label>
          <DatetimePicker
            v-model="form.birthday"
            :placeholder="
              t('form.placeholder.input', {
                field: t('$current.birthday'),
              })
            "
            tools:today
            tools:clear
            no:time
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.birthday.$invalid"
          >
            {{ t("$current.invalid.birthday") }}
          </p>
        </div>

        <div class="form-group relative">
          <label class="form-group__title">
            {{ t("$current.img") }}
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
              :src="form.img"
              alt=""
              :onerror="imgerror"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.isEnable") }}
          </label>
          <Toggle
            v-model:checked="form.isEnable"
            @update:checked="onEnableToggle"
            label=""
          />
        </div>

        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.isArticleAudit") }}
          </label>
          <Toggle
            v-model:checked="form.isArticleAudit"
            @update:checked="onArticleAuditToggle"
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
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useVuelidate, { required } from "@/hooks/use-vuelidate";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import Select from "@/widgets/select";
import DatetimePicker from "@/widgets/datetime-picker";
import Toggle from "@/widgets/actions/toggle";

/** helper */

export default {
  name: "AccountMemberCreateModal",
  props: {
    show: Boolean,
  },
  components: {
    Button,
    Modal,
    Select,
    DatetimePicker,
    Toggle,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix("pages.account.member.form");

    const form = reactive({
      account: "",
      birthday: "",
      img: "",
      isArticleAudit: true,
      isEnable: true,
      password: "",
      sex: "",
      username: "",
    });

    const rules = {
      account: { required },
      username: { required },
      password: { required },
      sex: { required },
      birthday: { required },
    };
    const messages = {
      account: { required: t("form.valid.required") },
      username: { required: t("form.valid.required") },
      password: { required: t("form.valid.required") },
      sex: { required: t("form.valid.required") },
      birthday: { required: t("form.valid.required") },
    };

    const v = useVuelidate(rules, form, messages);

    const onAfterShown = async () => {};

    const onAfterHidden = () => {
      v.value.$reset();
      form.account = "";
      form.birthday = "";
      form.img = "";
      form.isArticleAudit = true;
      form.isEnable = true;
      form.password = "";
      form.sex = "";
      form.username = "";
    };

    const formImg = ref();

    const uploadMainImg = async (image) => {
      let files = image.target.files || image.dataTransfer.files;
      if (!files.length) return;
      formImg.value = files;

      const res = await store.dispatch(
        "account/member/upload",
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
        form.img = res.result[0].url;
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

      form.birthday = form.birthday ? form.birthday + "T00:00:00Z" : "";
      form.sex = +form.sex;

      const res = await store.dispatch("account/member/create", form);
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
      emit("success", res.result);
    };

    const onEnableToggle = (display) => {
      form.isEnable = display;
    };

    const onArticleAuditToggle = (display) => {
      form.isArticleAudit = display;
    };

    return {
      t,
      form,
      invalid: v.value,
      onAfterShown,
      onAfterHidden,
      onClose,
      onSubmit,
      uploadMainImg,
      onEnableToggle,
      onArticleAuditToggle,
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
