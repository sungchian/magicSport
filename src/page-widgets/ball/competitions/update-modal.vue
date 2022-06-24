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
        <!-- <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.id") }}
          </label>
          <input
            type="text"
            class="form-control"
            v-model="form.competitionId"
            readonly
          />
        </div> -->

        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.competitionName") }}
          </label>
          <input
            type="text"
            class="form-control"
            v-model="form.competitionName"
            readonly
          />
        </div>

        <div
          class="form-group form-group--required"
          :class="[
            invalid.competitionNameByBallard.$invalid && 'form-group--invalid',
          ]"
        >
          <label class="form-group__title">
            {{ t("$current.nameByBallard") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', {
                field: t('$current.nameByBallard'),
              })
            "
            v-model="form.competitionNameByBallard"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.competitionNameByBallard.$invalid"
          >
            {{ invalid.competitionNameByBallard.$errors[0]?.$message }}
          </p>
        </div>

        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.sportType") }}
          </label>
          <!-- <input
            type="text"
            class="form-control"
            v-model="form.sportType"
            readonly
          /> -->
          <div
            v-if="form.sportType === 1"
            class="form-control"
            style="
              background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
              color: rgba(156, 163, 175, var(--tw-text-opacity));
            "
          >
            足球
          </div>
          <div
            v-else-if="form.sportType === 2"
            class="form-control"
            style="
              background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
              color: rgba(156, 163, 175, var(--tw-text-opacity));
            "
          >
            籃球
          </div>
          <div
            v-else
            class="form-control"
            style="
              background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
              color: rgba(156, 163, 175, var(--tw-text-opacity));
            "
          >
            &nbsp;
          </div>
        </div>
        <div class="form-group">
          <label class="form-group__title">
            {{ t("$current.isDisabled") }}
          </label>
          <Toggle :checked="!form.isDisabled" @update:checked="onToggle" />
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
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useVuelidate, { required } from "@/hooks/use-vuelidate";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import Toggle from "@/widgets/actions/toggle";

export default {
  name: "AccountStaffUpdateModal",
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
    setPrefix({ $current: "pages.ball.competitions.form" });

    const form = reactive({
      competitionId: computed(() => props.data.competitionId),
      competitionName: "",
      sort: "",
      sportType: "",
      competitionNameByBallard: "",
      isDisabled: false,
    });

    const rules = {
      //前面是元件，後面是自定義條件
      competitionNameByBallard: { required },
      sportType: { required },
    };
    const messages = {
      competitionNameByBallard: { required: t("form.valid.required") },
      sportType: { required: t("form.valid.required") },
    };
    const v = useVuelidate(rules, form, messages);

    const onAfterShown = async () => {
      form.competitionId = props.data.competitionId;
      form.competitionName = props.data.competitionName;
      form.sort = props.data.sort;
      form.sportType = props.data.sportType;
      form.competitionNameByBallard = props.data.competitionNameByBallard;
      form.isDisabled = props.data.isDisabled;
    };

    const onAfterHidden = () => {
      v.value.$reset();
      form.competitionId = "";
      form.competitionName = "";
      form.sort = "";
      form.sportType = "";
      form.competitionNameByBallard = "";
      form.isDisabled = false;
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

      form.sort = +form.sort;
      form.sportType = +form.sportType;
      const res = await store.dispatch("ball/competitions/update", form);

      done();
      onClose();
      if (res.state !== 0) {
        if (res.error) {
          store.commit("app/set/alert", {
            type: "danger",
            message: t("feedback.update.failed", {
              reason: t(`error.${res.error[0].message}`),
            }),
          });
        } else {
          store.commit("app/set/alert", {
            type: "danger",
            message: t("feedback.update.failed", {
              reason: t(`error.${res.result}`),
            }),
          });
        }

        return false;
      }

      store.commit("app/set/alert", {
        type: "success",
        message: t("feedback.update.success.with.describe", {
          describe: t("$current.update.success", {
            name: form.competitionName,
          }),
        }),
      });
      emit("success", res.result);
    };

    const onToggle = (display) => {
      form.isDisabled = !display;
    };

    return {
      t,
      form,
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
