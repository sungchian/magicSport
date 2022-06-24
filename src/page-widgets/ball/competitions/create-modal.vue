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
          :class="[invalid.sportType.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.sportType") }}
          </label>
          <Select
            v-model="form.sportType"
            :placeholder="
              t('form.placeholder.select', { field: t('$current.sportType') })
            "
            :options="options.sportTypes"
            @changed="onSearch"
          >
          </Select>
          <p
            class="form-group__invalid-message"
            v-if="invalid.sportType.$invalid"
          >
            {{ invalid.sportType.$errors[0]?.$message }}
          </p>
        </div>
        <!-- <div
          class="form-group form-group--required"
          :class="[invalid.competitionId.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.id") }}
          </label>
          <input
            type="text"
            class="form-control"
            :placeholder="
              t('form.placeholder.input', {
                field: t('$current.competitionId'),
              })
            "
            v-model="sportForm.competitionId"
          />
          <p
            class="form-group__invalid-message"
            v-if="invalid.competitionId.$invalid"
          >
            {{ invalid.competitionId.$errors[0]?.$message }}
          </p>
        </div> -->
        <div
          class="form-group form-group--required"
          :class="[invalid.competitionName.$invalid && 'form-group--invalid']"
        >
          <label class="form-group__title">
            {{ t("$current.competitionName") }}
          </label>
          <!-- <SelectHuge
            v-model="sportForm.competitionName"
            :placeholder="
              t('form.placeholder.select', {
                field: t('$current.competitionName'),
              })
            "
            :options="options.competitionName"
            input
            @changed="fillData"
          >
          </SelectHuge> -->
          <Select
            v-model="sportForm.competitionName"
            :placeholder="
              t('form.placeholder.select', {
                field: t('$current.competitionName'),
              })
            "
            :options="options.competitionName"
            input
            virtual
            @changed="fillData"
          >
          </Select>
          <p
            class="form-group__invalid-message"
            v-if="invalid.competitionName.$invalid"
          >
            {{ invalid.competitionName.$errors[0]?.$message }}
          </p>
        </div>
        <div
          class="form-group form-group--required"
          :class="[invalid.sort.$invalid && 'form-group--invalid']"
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
            v-model="form.sort"
          />
          <p class="form-group__invalid-message" v-if="invalid.sort.$invalid">
            {{ invalid.sort.$errors[0]?.$message }}
          </p>
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
            {{ t("$current.isDisabled") }}
          </label>
          <Toggle
            :checked="!form.isDisabled"
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
import useVuelidate, { required, integer } from "@/hooks/use-vuelidate";

/** components */
import Button from "@/widgets/button";
import Modal from "@/widgets/modal";
import Select from "@/widgets/select";
// import SelectHuge from "@/widgets/select-huge";
import Toggle from "@/widgets/actions/toggle";

import { map } from "ramda";

export default {
  name: "ArticleManageCreateModal",
  props: {
    show: Boolean,
    sportTypes: Array,
  },
  components: {
    Button,
    Modal,
    Select,
    // SelectHuge,
    Toggle,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix("pages.ball.competitions.form");
    const form = reactive({
      competitionId: "",
      competitionName: "",
      sort: "",
      sportType: "",
      competitionNameByBallard: "",
      isDisabled: false,
    });

    const options = reactive({
      sportTypes: [],
      competitionName: [],
    });

    const rules = {
      // competitionId: { integer },
      competitionName: { required },
      sort: { required, integer },
      sportType: { required },
      competitionNameByBallard: { required },
    };
    const messages = {
      // competitionId: {
      //   required: t("form.valid.required"),
      //   integer: t("form.valid.integer"),
      // },
      competitionName: { required: t("form.valid.required") },
      sort: {
        required: t("form.valid.required"),
        integer: t("form.valid.integer"),
      },
      sportType: { required: t("form.valid.required") },
      competitionNameByBallard: { required: t("form.valid.required") },
    };

    const v = useVuelidate(rules, form, messages);

    const sportForm = reactive({
      competitionId: "",
      competitionName: "",
    });

    const onAfterShown = async () => {
      options.sportTypes = map(
        (type) => ({ value: type.id, children: type.name }),
        props.sportTypes
      );
    };

    const onAfterHidden = () => {
      v.value.$reset();
      form.competitionId = "";
      form.competitionName = "";
      form.sort = "";
      form.sportType = "";
      form.competitionNameByBallard = "";
      form.isDisabled = false;
      options.sportTypes = [];
      sportForm.competitionId = "";
      sportForm.competitionName = "";
    };

    const onClose = () => {
      emit("update:show", false);
    };

    const fillData = async () => {
      form.competitionId = sportForm.competitionName.id;
      form.competitionName = sportForm.competitionName.name;
    };

    const onSearch = async () => {
      if (form.sportType === 1) {
        const res = await store.dispatch("ball/competitions/read/football");

        if (res.state === 0) {
          options.competitionName = map(
            (name) => ({ value: name, children: name.name }),
            res.result
          );
        } else {
          options.competitionName = [];
        }
      } else if (form.sportType === 2) {
        const res = await store.dispatch("ball/competitions/read/basketball");

        if (res.state === 0) {
          options.competitionName = map(
            (name) => ({ value: name, children: name.name }),
            res.result
          );
        } else {
          options.competitionName = [];
        }
      } else {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.create.failed", {
            reason: t(`球類列別讀取錯誤`),
          }),
        });
      }
    };

    const onSubmit = async (done) => {
      v.value.$touch();
      if (v.value.$invalid) {
        done();
        return false;
      }

      form.competitionId = +form.competitionId;
      form.sort = +form.sort;
      const res = await store.dispatch("ball/competitions/create", form);
      done();
      onClose();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.create.failed", {
            reason: res.data.error
              ? t(`error.${res.error[0].message}`)
              : t(`error.${res.data.state}`),
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
      form.isDisabled = !display;
    };

    return {
      sportForm,
      t,
      form,
      options,
      invalid: v.value,
      onAfterShown,
      onAfterHidden,
      fillData,
      onClose,
      onSearch,
      onSubmit,
      onToggle,
    };
  },
};
</script>
