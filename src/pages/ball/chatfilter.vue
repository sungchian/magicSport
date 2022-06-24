<template>
  <div>
    <h1 class="page-header">{{ t("$current.page.title") }}</h1>
    <div class="page-toolbar">
      <div class="page-toolbar__actions">
        <Remove @click="onRemove" :invalid="checkboxes.items.length === 0" />
        <Filter
          v-model="conditions.filter"
          :options="[
            { value: 'content', children: t('$field.content') },
            { value: 'type', children: t('$field.type') },
            { value: 'isEnable', children: t('$field.isEnable') },
            { value: 'createdBy', children: t('$field.createdBy') },
            { value: 'updatedBy', children: t('$field.updatedBy') },
            { value: 'created', children: t('$field.created') },
            { value: 'updated', children: t('$field.updated') },
          ]"
        />
        <Export />
        <Printer />
      </div>
      <div class="page-toolbar__buttons">
        <Button @click="onCreate">
          <i class="fas fa-plus"></i>
          <span class="ml-2">{{ t("$current.button.create") }}</span>
        </Button>
      </div>
    </div>
    <div class="page-content">
      <Table :filter="conditions.filter" :isEmpty="data.list.length === 0">
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
            <th scope="col" data-filter="content">
              {{ t("$field.content") }}
            </th>
            <th scope="col" data-filter="type">
              {{ t("$field.type") }}
            </th>
            <th scope="col" data-filter="isEnable">
              {{ t("$field.isEnable") }}
            </th>
            <th scope="col" data-filter="createdBy">
              {{ t("$field.createdBy") }}
            </th>
            <th scope="col" data-filter="updatedBy">
              {{ t("$field.updatedBy") }}
            </th>
            <th scope="col" data-filter="created" class="w-48">
              {{ t("$field.created") }}
            </th>
            <th scope="col" data-filter="updated" class="w-48">
              {{ t("$field.updated") }}
            </th>
            <th scope="col" class="text-left w-48">
              {{ t("$field.actions") }}
            </th>
          </tr>
        </template>
        <template #tbody>
          <tr
            class="hover:bg-gray-100"
            v-for="(row, idx) in data.list"
            :key="`row-${row.id}`"
          >
            <td class="text-center">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="checkboxes.items"
                  :value="row"
                  class="form-checkbox"
                />
              </div>
            </td>
            <td class="text-center">
              {{ (conditions.pageIndex - 1) * conditions.pageSize + (idx + 1) }}
            </td>
            <td class="text-center">{{ row.content }}</td>
            <td class="text-center">
              {{ row.type === 1 ? "完全符合" : "包含" }}
            </td>
            <td class="text-center">
              <IconStatus
                :enabled="row.isEnable"
                :true-value="t('$field.status.enabled')"
                :false-value="t('$field.status.disabled')"
              />
            </td>
            <td class="text-center">
              <Tooltip :content="row.createdByAccount">
                {{ row.createdBy }}
              </Tooltip>
            </td>
            <td class="text-center">
              <Tooltip :content="row.updatedByAccount">
                {{ row.updatedBy }}
              </Tooltip>
            </td>
            <td class="text-center">
              {{
                row.createdAt
                  ? row.createdAt.replace(/T|Z/gi, " ")
                  : row.createdAt
              }}
            </td>
            <td class="text-center">
              {{
                row.updatedAt
                  ? row.updatedAt.replace(/T|Z/gi, " ")
                  : row.updatedAt
              }}
            </td>
            <td class="space-x-1 whitespace-nowrap">
              <Button
                size="xs"
                type="light"
                @click="(done) => onUpdate(done, { id: row.id, index: idx })"
                async
              >
                {{ t("widgets.button.update") }}
              </Button>
            </td>
          </tr>
        </template>
      </Table>
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
      :chatfilter="chatfilter"
    />
    <UpdateModal
      v-model:show="modal.update"
      :data="modal.updateData"
      @success="updateOne"
      :chatfilter="chatfilter"
    />
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useCheckboxes from "@/hooks/use-checkboxes2";

// component
import Tooltip from "@/widgets/tooltip";
import Button from "@/widgets/button";
import Table from "@/widgets/table";
import Pagination from "@/widgets/pagination";
import Remove from "@/widgets/actions/remove";
import Filter from "@/widgets/actions/filter";
import Export from "@/widgets/actions/export";
import Printer from "@/widgets/actions/printer";
import IconStatus from "@/widgets/icon-status";
import CreateModal from "@/page-widgets/ball/chatfilter/create-modal";
import UpdateModal from "@/page-widgets/ball/chatfilter/update-modal";

/** components */
import { mergeDeepRight } from "ramda";

import chatfilter from "@/constants/chatfilter";

export default {
  breadcrumb: ["MODULE_BALL", "BALL_CHATFILTER_MANAGE"],
  components: {
    Tooltip,
    Button,
    Table,
    Pagination,
    Remove,
    Filter,
    Export,
    Printer,
    CreateModal,
    UpdateModal,
    IconStatus,
  },
  setup() {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.ball.chatfilter",
      $field: "$current.field",
    });

    const [checkboxes, checkReset] = useCheckboxes({
      // itemValues: computed(() => pluck("id", data.list)),
      itemValues: computed(() => data.list),
    });

    const conditions = reactive({
      filter: [
        "content",
        "type",
        "isEnable",
        "createdBy",
        "updatedBy",
        "created",
        "updated",
      ],
      pageIndex: 1,
      pageSize: 20,
      sortName: "sort",
      sortBy: "desc",
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

    const fetch = async () => {
      const res = await store.dispatch("ball/chatfilter/read/list", conditions);
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
        "ball/chatfilter/delete",
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
      setTimeout(() => {
        fetch();
      }, 500);
      // fetch();
    };

    const onCreate = () => {
      modal.create = true;
    };

    const onUpdate = async (done, { id, index }) => {
      const res = await store.dispatch("ball/chatfilter/read/one", {
        id,
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

    let idx = ref();

    const updateOne = async (payload) => {
      data.list[idx.value] = mergeDeepRight(data.list[idx.value], payload);
    };

    return {
      t,
      checkboxes,
      conditions,
      chatfilter,
      data,
      modal,
      fetch,
      onRemove,
      onCreate,
      onUpdate,
      idx,
      updateOne,
    };
  },
};
</script>
