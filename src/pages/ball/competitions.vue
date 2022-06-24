<template>
  <div>
    <h1 class="page-header">{{ t("$current.page.title") }}</h1>
    <div class="page-toolbar">
      <div class="page-toolbar__actions">
        <Remove @click="onRemove" :invalid="checkboxes.items.length === 0" />
        <Filter
          v-model="conditions.filter"
          :options="[
            { value: 'sportType', children: t('$field.sportType') },
            { value: 'name', children: t('$field.name') },
            { value: 'nameByBallard', children: t('$field.nameByBallard') },
            { value: 'isDisabled', children: t('$field.isDisabled') },
            { value: 'sort', children: t('$field.sort') },
          ]"
        />
        <Export />
        <Printer />
      </div>
      <div class="page-toolbar__buttons">
        <Button @click="onSave" v-show="saveSort">
          <i class="fas fa-save"></i>
          <span class="ml-2">{{ t("$current.button.save") }}</span>
        </Button>
        <Button @click="onCreate">
          <i class="fas fa-plus"></i>
          <span class="ml-2">{{ t("$current.button.create") }}</span>
        </Button>
      </div>
    </div>
    <div class="page-content">
      <Table2 :filter="conditions.filter">
        <template #thead>
          <tr>
            <th scope="col" class="w-10 text-center">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="checkboxes.all"
                  :true-value="1"
                  :false-value="0"
                  :indeterminate="checkboxes.all === 2"
                  class="form-checkbox"
                />
              </div>
            </th>
            <th scope="col" class="w-10 text-center">#</th>
            <th scope="col" data-filter="sportType" class="w-24">
              {{ t("$field.sportType") }}
            </th>
            <th scope="col" data-filter="name">
              {{ t("$field.name") }}
            </th>
            <th scope="col" data-filter="nameByBallard" class="w-48">
              {{ t("$field.nameByBallard") }}
            </th>
            <th scope="col" data-filter="isDisabled">
              {{ t("$field.isDisabled") }}
            </th>
            <th scope="col" data-filter="sort">
              {{ t("$field.sort") }}
            </th>
            <th scope="col" class="text-left w-48">
              {{ t("$field.actions") }}
            </th>
          </tr>
        </template>
        <draggable
          v-model="data.list"
          tag="tbody"
          :item-key="`row-${data.list.competitionId}`"
          class="bg-white divide-y divide-gray-200"
          :animation="200"
          @change="log"
        >
          <template #item="{ element, index }">
            <tr v-if="data.list.length === 0">
              <td colspan="100%" class="p-3 text-center text-gray-400">
                {{ t("widgets.table.empty") }}
              </td>
            </tr>
            <tr v-else class="hover:bg-gray-100">
              <td class="text-center">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="checkboxes.items"
                    :value="element"
                    class="form-checkbox"
                  />
                </div>
              </td>
              <td class="text-center">
                {{
                  (conditions.pageIndex - 1) * conditions.pageSize + (index + 1)
                }}
              </td>
              <!-- <td
                v-if="element.sportType === 1"
                class="text-center bg-yellow-300"
              >
                足球
              </td> -->
              <td v-if="element.sportType === 1" class="text-center">
                <span
                  class="bg-yellow-300 mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-500"
                  >足球</span
                >
              </td>
              <td v-else class="text-center">
                <span
                  class="bg-red-400 mr-2 px-2.5 py-0.5 rounded dark:bg-red-700 dark:text-red-900"
                  >籃球</span
                >
              </td>
              <td class="text-center">{{ element.competitionName }}</td>
              <td class="text-center">
                {{ element.competitionNameByBallard }}
              </td>
              <td class="text-center">
                <IconStatus
                  :enabled="!element.isDisabled"
                  :true-value="t('$field.status.enabled')"
                  :false-value="t('$field.status.disabled')"
                />
              </td>
              <td class="text-center">{{ element.sort }}</td>
              <td class="space-x-1 whitespace-nowrap">
                <Button
                  size="xs"
                  type="light"
                  @click="
                    (done) =>
                      onUpdate(done, {
                        competitionId: element.competitionId,
                        sportType: element.sportType,
                        index: index,
                      })
                  "
                  async
                >
                  {{ t("widgets.button.update") }}
                </Button>
              </td>
            </tr>
          </template>
        </draggable>
      </Table2>
    </div>
    <div class="page-pagination">
      <Pagination
        :total="data.total"
        v-model:page="conditions.pageIndex"
        v-model:perpage="conditions.pageSize"
        @changed="fetch"
      />
    </div>
    <CreateModal
      v-model:show="modal.create"
      @success="fetch"
      :sportTypes="sportTypes"
    />
    <UpdateModal
      v-model:show="modal.update"
      :data="modal.updateData"
      :sportTypes="sportTypes"
      @success="updateOne"
    />
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed, inject } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useCheckboxes from "@/hooks/use-checkboxes2";
//import Mock from "../account/mock.vue";

/** helper */
import { mergeDeepRight } from "ramda";

// component
import Button from "@/widgets/button";
import Table2 from "@/widgets/table2";
import IconStatus from "@/widgets/icon-status";
import Pagination from "@/widgets/pagination";
import Remove from "@/widgets/actions/remove";
import Filter from "@/widgets/actions/filter";
import Export from "@/widgets/actions/export";
import Printer from "@/widgets/actions/printer";
import CreateModal from "@/page-widgets/ball/competitions/create-modal";
import UpdateModal from "@/page-widgets/ball/competitions/update-modal";

/** components */
import draggable from "vuedraggable";

/** constants */
import sportTypes from "@/constants/sport-types";

import {
  CONFIRM_QUESTION_GREEN,
  // CONFIRM_QUESTION_RED,
} from "@/plugins/sweetalert";

export default {
  breadcrumb: ["MODULE_BALL", "BALL_MANAGE"],
  components: {
    Button,
    IconStatus,
    Table2,
    Pagination,
    Remove,
    Filter,
    Export,
    Printer,
    CreateModal,
    UpdateModal,
    draggable,
  },
  beforeRouteLeave(to, from) {
    if (this.saveSort === true) {
      const answer = window.confirm("確定要離開嗎? 你還有更新尚未存檔!");
      if (!answer) {
        return from;
      }
    }
  },
  setup() {
    const dragging = ref(false);
    const swal = inject("$swal");
    //
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.ball.competitions",
      $field: "$current.field",
    });

    const [checkboxes, checkReset] = useCheckboxes({
      // itemValues: computed(() => pluck("competitionId", data.list)),
      itemValues: computed(() => data.list),
    });

    const conditions = reactive({
      filter: [
        "id",
        "sportType",
        "name",
        "nameByBallard",
        "isDisabled",
        "sort",
      ],
      pageIndex: 1,
      pageSize: 20,
    });

    const data = reactive({
      total: 0,
      list: [],
    });

    const modal = reactive({
      create: false,
      update: false,
      updateData: {},
    });

    const saveSort = ref(false);

    const fetch = async () => {
      const res = await store.dispatch(
        "ball/competitions/read/list",
        conditions
      );
      if (res.state === 0) {
        data.list = res.result.rows === null ? [] : res.result.rows;
        data.total = res.result.totalPages;
      } else {
        data.list = [];
        data.total = 0;
      }
    };

    onMounted(() => {
      fetch();
    });

    const onRemove = async (done) => {
      const res = await store.dispatch(
        "ball/competitions/delete",
        checkboxes.items
      );
      done();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.delete.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
        return;
      }
      store.commit("app/set/alert", {
        type: "success",
        message: t("feedback.delete.success"),
      });
      checkReset();
      fetch();
    };

    // test
    // const onRemove2 = async (done, { id }) => {
    //   const res = await store.dispatch("article/category/delete", {
    //     id,
    //   });
    //   done();
    //   console.log(res);
    //   if (res.state !== 0) {
    //     store.commit("app/set/alert", {
    //       type: "danger",
    //       message: t("feedback.delete.failed", {
    //         reason: t(`error.${res.error[0].message}`),
    //       }),
    //     });
    //     return;
    //   }
    //   store.commit("app/set/alert", {
    //     type: "success",
    //     message: t("feedback.delete.success"),
    //   });
    //   checkReset();
    //   fetch();
    // };

    const onCreate = () => {
      modal.create = true;
    };

    let idx = ref();

    const onUpdate = async (done, { competitionId, sportType, index }) => {
      const res = await store.dispatch("ball/competitions/read/one", {
        competitionId,
        sportType,
      });
      done();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.read.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
      } else {
        idx.value = index;
        modal.update = true;
        modal.updateData = res.result;
      }
    };

    const onSave = async () => {
      const { isConfirmed } = await swal.fire({
        ...CONFIRM_QUESTION_GREEN,
        title: t("widgets.actions.save.title"),
        text: t("widgets.actions.save.text"),
      });

      if (isConfirmed) {
        for (let i = 1; i <= data.list.length; i++) {
          data.list[i - 1].sort =
            (conditions.pageIndex - 1) * conditions.pageSize + i;
        }
        const res = await store.dispatch(
          "ball/competitions/updateList",
          data.list
        );
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
            describe: t("$current.form.updateAll.success"),
          }),
        });
        saveSort.value = false;
      }
    };

    const updateOne = async (payload) => {
      data.list[idx.value] = mergeDeepRight(data.list[idx.value], payload);
    };

    const log = () => {
      saveSort.value = true;
      // 參數可放evt
    };

    return {
      saveSort,
      dragging,
      t,
      checkboxes,
      conditions,
      data,
      modal,
      fetch,
      onRemove,
      onCreate,
      onUpdate,
      onSave,
      log,
      idx,
      updateOne,
      sportTypes,
    };
  },
};
</script>
