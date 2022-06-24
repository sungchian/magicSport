<template>
  <Modal
    size="lg"
    :show="show"
    @update:show="onClose"
    @afterHidden="onAfterHidden"
    @afterShown="onAfterShown"
  >
    <template #title>{{ t("$current.audit.title") }}</template>
    <template #body>
      <div class="grid grid-cols-3 gap-4">
        <div
          class="form-group"
          :class="[invalid.categoryId.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.title") }}
          </label>
          <div class="form-control">
            {{ form.title || "&nbsp;" }}
          </div>
        </div>
        <div
          class="form-group"
          :class="[invalid.categoryId.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.shortContent") }}
          </label>
          <div class="form-control">
            {{ form.shortContent || "&nbsp;" }}
          </div>
        </div>
        <div
          class="form-group"
          :class="[invalid.categoryId.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.categoryName") }}
          </label>
          <div class="form-control">
            {{ form.categoryName || "&nbsp;" }}
          </div>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.isTop") }}
          </label>
          <Toggle :checked="form.isTop" label="" onclick="return false" />
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.label") }}
          </label>
          <div class="form-control">
            {{ form.label || "&nbsp;" }}
          </div>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.type") }}
          </label>
          <div class="form-control">
            {{ form.type || "&nbsp;" }}
          </div>
        </div>
        <div class="form-group relative">
          <label class="form-group__title">
            {{ t("$current.mainImg") }}
          </label>
          <img
            class="audit-img"
            :src="form.mainImg"
            alt=""
            :onerror="imgerror"
          />
        </div>
      </div>

      <div class="form-group w-full">
        <label class="form-group__title">
          {{ t("$current.articleContent") }}
        </label>
        <div class="form-group">
          <div
            class="form-control"
            v-html="form.articleContent || '&nbsp;'"
          ></div>
        </div>
      </div>
      <div
        class="form-group w-full"
        :class="[invalid.reason.$invalid && 'form-group--invalid']"
      >
        <label class="form-group__title">
          {{ t("$current.audit.fail.reason") }}
        </label>
        <textarea
          ref="reason"
          type="text"
          class="form-control"
          rows="5"
          :placeholder="
            t('form.placeholder.input', {
              field: t('$current.audit.fail.reason'),
            })
          "
          v-model="form.reason"
        />
      </div>
    </template>
    <template #footer>
      <Button size="md" type="green" class="w-24" @click="auditPass" async>
        {{ t("widgets.button.audit.pass") }}
      </Button>
      <Button size="md" type="red" class="w-24" @click="auditFail" async>
        {{ t("widgets.button.audit.fail") }}
      </Button>
    </template>
  </Modal>
</template>
<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useVuelidate, { required } from "@/hooks/use-vuelidate";

import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import Toggle from "@/widgets/actions/toggle";

export default {
  name: "ArticleAuditModal",
  props: {
    show: Boolean,
    data: Object,
    articleTypes: Array,
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
    setPrefix({ $current: "pages.article.audit.form" });

    const form = reactive({
      approver: "",
      articleContent: "",
      auditStatus: false,
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
      type: "",
      reason: "",
    });

    const rules = {
      //前面是元件，後面是自定義條件
      categoryId: { required },
      reason: { required },
    };
    const messages = {
      categoryId: { required: t("form.valid.required") },
      reason: { required: t("form.valid.required") },
    };
    const v = useVuelidate(rules, form, messages);

    const reason = ref(null);
    const onAfterShown = async () => {
      reason.value.focus();
      form.approver = props.data.approver;
      form.articleContent = props.data.articleContent;
      form.auditStatus = props.data.auditStatus;
      form.categoryId = props.data.categoryId;
      form.categoryName = props.data.categoryName;
      form.greatCount = props.data.greatCount;
      form.id = props.data.id;
      form.isTop = props.data.isTop;
      form.label = props.data.label;
      form.mainImg = props.data.mainImg;
      form.publisher = props.data.publisher;
      form.shortContent = props.data.shortContent;
      form.type = props.articleTypes[props.data.type - 1].name;
      form.title = props.data.title;
      form.reason = props.data.reason;
    };

    const onAfterHidden = () => {
      v.value.$reset();
      form.approver = "";
      form.articleContent = "";
      form.auditStatus = "";
      form.categoryId = "";
      form.categoryName = "";
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
      form.reason = "";
    };

    const onClose = () => {
      emit("update:show", false);
    };

    const auditPass = async (done) => {
      const res = await store.dispatch("article/audit/audit", {
        articleId: form.id,
        auditStatus: true,
      });

      done();
      onClose();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.audit.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
        return false;
      }

      store.commit("app/set/alert", {
        type: "success",
        message: t("feedback.audit.success.with.describe", {
          describe: t("$current.audit.success", { name: form.shortContent }),
        }),
      });

      emit("success");
    };

    const auditFail = async (done) => {
      v.value.$touch();
      if (v.value.$invalid) {
        done();
        return false;
      }

      const res = await store.dispatch("article/audit/audit", {
        articleId: form.id,
        auditStatus: false,
        reason: form.reason,
      });

      done();
      onClose();

      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.audit.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
        return false;
      }

      store.commit("app/set/alert", {
        type: "danger",
        message: t("$current.audit.success.fail", {
          name: form.shortContent,
          reason: form.reason,
        }),
      });

      emit("success");
    };

    const imgerror = (event) => {
      // event.currentTarget.src = require("../../../../");
      console.log(event);
      // event.currentTarget.src =
      //   "https://d25ktuez36ppw3.cloudfront.net/img/articles/fifa234234.jpg";
      // return true;
    };

    return {
      t,
      form,
      invalid: v.value,
      onAfterShown,
      onAfterHidden,
      onClose,
      auditPass,
      auditFail,
      imgerror,
      reason,
    };
  },
};
</script>

<style scoped>
.audit-img {
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 2147483647;
  padding: 0;
  max-width: 4.85rem;
  max-height: 4.85rem;
}
.audit-img:hover {
  transform: scale(5) translateX(40%);
}
</style>
