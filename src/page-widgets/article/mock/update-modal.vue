<template>
  <Modal
    size="full"
    :show="show"
    @update:show="onClose"
    @afterHidden="onAfterHidden"
    @afterShown="onAfterShown"
  >
    <template #title>{{ t("$current.update.title") }}</template>
    <template #body>
      <ckeditor
        v-model="fullEditorData"
        :editor="fullEditor"
        :config="editorConfig"
      ></ckeditor>
    </template>

    <template #footer>
      <Button size="md" class="w-24" @click="onSubmit" async>
        {{ t("widgets.swal.confirm") }}
      </Button>
    </template>
  </Modal>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";

/** helper */

export default {
  name: "ArticleMockEditModal",
  props: {
    show: Boolean,
    editorDisabled: Boolean,
    content: String,
    fullEditor: Function,
    editorConfig: Object,
  },
  components: {
    Button,
    Modal,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.account.mock",
      $field: "$current.field",
    });

    const fullEditorData = ref(props.content);

    const onSubmit = async (done) => {
      props.editorDisabled == !props.editorDisabled;
      //待修
      // const resCode = await store.dispatch(
      //   "account/agent/update",
      //   content.value
      // );

      done();
      //onClose();
      //待修
      // if (resCode !== 1) {
      //   store.commit("app/set/alert", {
      //     type: "danger",
      //     message: t("feedback.update.failed", {
      //       reason: t(`error.${resCode}`),
      //     }),
      //   });
      //   return false;
      // }
      //待修
      store.commit("app/set/alert", {
        type: "success",
        message: t("feedback.update.success"),
      });
      //待修
      console.log(props.editorDisabled);
      emit("success");
    };

    const onAfterShown = async () => {
      //const roles = await store.dispatch("xxx");
      console.log("after");
      //灌資料進去
    };

    //待修
    const onAfterHidden = () => {
      //清空content
    };

    //待修
    const onClose = () => {
      emit("update:show", false);
    };

    return {
      t,
      fullEditorData,
      onAfterShown,
      onAfterHidden,
      onClose,
      onSubmit,
    };
  },
};
</script>
