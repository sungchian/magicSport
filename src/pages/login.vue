<template>
  <form class="p-8 space-y-6" novalidate>
    <div
      class="form-group"
      :class="[invalid.username.$invalid && 'form-group--invalid']"
    >
      <label class="form-group__title mb-2">
        {{ t("pages.login.username") }}
      </label>
      <input
        type="text"
        class="form-control"
        v-model="form.username"
        @keypress.enter="onNextInputEnter"
        autocomplete="off"
        required
      />
      <p class="form-group__invalid-message" v-if="invalid.username.$invalid">
        {{ invalid.username.$errors[0]?.$message }}
      </p>
    </div>
    <div
      class="form-group"
      :class="[invalid.password.$invalid && 'form-group--invalid']"
    >
      <label class="form-group__title mb-2">
        {{ t("pages.login.password") }}
      </label>
      <input
        type="password"
        class="form-control"
        v-model="form.password"
        @keypress.enter="onNextInputEnter"
        autocomplete="off"
        required
      />
      <p class="form-group__invalid-message" v-if="invalid.password.$invalid">
        {{ invalid.password.$errors[0]?.$message }}
      </p>
    </div>
    <div
      class="form-group"
      :class="[invalid.captcha.$invalid && 'form-group--invalid']"
    >
      <label class="form-group__title mb-2">
        {{ t("pages.login.captcha") }}
      </label>
      <div class="form-control-group">
        <input
          type="text"
          class="form-control"
          v-model="form.captcha"
          @keypress.enter="onNextInputEnter"
          autocomplete="off"
          required
        />
        <span
          class="form-control-addon w-36 cursor-pointer"
          @click="getCaptcha"
        >
          <img alt="Loading..." :src="form.captchaImg" />
        </span>
      </div>
      <p class="form-group__invalid-message" v-if="invalid.captcha.$invalid">
        {{ invalid.captcha.$errors[0]?.$message }}
      </p>
    </div>
    <div class="form-group flex items-start">
      <div class="flex items-center h-5">
        <input
          type="checkbox"
          class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
          v-model="form.remember"
          autocomplete="off"
          @keypress.enter.prevent
          required
        />
      </div>
      <div class="text-sm ml-3">
        <label for="remember" class="font-medium text-gray-900">
          {{ t("pages.login.remember.me") }}
        </label>
      </div>
    </div>
    <div class="form-group space-x-3">
      <Button tag="div" type="primary" size="lg" @click="onAdminSubmit" async>
        {{ t("pages.login.admin.button") }}
      </Button>
    </div>
  </form>
</template>
<script>
import { reactive, onMounted, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate, { required } from "@/hooks/use-vuelidate";
import useI18n from "@/hooks/use-i18n";
import Button from "@/widgets/button";

export default {
  layout: "layout-login",
  needAuth: false,
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const storage = inject("$storage");
    const form = reactive({
      captchaImg: null,
      cacheKey: "",
      username: "",
      password: "",
      captcha: "",
      remember: true,
    });
    const rules = {
      username: { required },
      password: { required },
      captcha: { required },
    };
    const messages = {
      username: { required: t("form.valid.required") },
      password: { required: t("form.valid.required") },
      captcha: { required: t("form.valid.required") },
    };
    const v = useVuelidate(rules, form, messages);

    const getCaptcha = async () => {
      const res = await store.dispatch("auth/read/captcha");
      if (!res.error) {
        form.captchaImg = res.result.captcha_img;
        form.cacheKey = res.result.captcha;
      }
    };
    onMounted(() => {
      getCaptcha();
      const { status, type } = store.state.route.params;
      if (status && type) {
        switch (status) {
          case "logout":
            store.commit("app/set/alert", {
              type,
              message: t(`pages.login.alert.${status}`),
            });
            break;
          default:
            store.commit("app/set/alert", {
              type,
              message: t(`error.${status}`),
            });
            break;
        }
      }
    });

    const onAdminSubmit = async (done) => {
      v.value.$touch();
      if (v.value.$invalid) {
        done();
        return false;
      }

      const res = await store.dispatch("auth/login", form);
      if (res.state === 0) {
        store.commit("app/set/alert", {
          type: "success",
          message: t("pages.login.request.success"),
        });
        setTimeout(function () {
          storage.set("theme", "cyan");
          router.push({
            name: "default-path",
          });
        }, 2000);
        return;
      }
      store.commit("app/set/alert", {
        type: "danger",
        message: t("pages.login.request.failed", {
          reason: t(`error.${res.error[0].message}`),
        }),
      });
      await getCaptcha();
      v.value.$reset();
      // eslint-disable-next-line require-atomic-updates
      form.captcha = "";
      done();
    };

    const onNextInputEnter = (e) => {
      if (e.target.parentNode.nextElementSibling) {
        e.preventDefault();
        e.target.parentNode.nextElementSibling
          .getElementsByTagName("input")[0]
          .focus();
        return false;
      }
    };

    return {
      t,
      form,
      invalid: v.value,
      onAdminSubmit,
      getCaptcha,
      onNextInputEnter,
    };
  },
};
</script>
