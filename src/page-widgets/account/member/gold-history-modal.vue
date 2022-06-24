<template>
  <Modal
    size="lg"
    :show="show"
    @update:show="onClose"
    @beforeShow="onBeforeShown"
    @afterHidden="onAfterHidden"
    hide-footer
  >
    <template #title>
      {{ t("$current.field.history") }}
    </template>
    <template #body>
      <div class="px-5">
        <div class="page-content">
          <Table :isEmpty="data.list.length === 0">
            <template #thead>
              <tr>
                <th scope="col">
                  {{ t("$field.history.created") }}
                </th>
                <th scope="col">
                  {{ t("$field.history.type") }}
                </th>
                <th scope="col">
                  {{ t("$field.history.recordAmountType") }}
                </th>
                <th scope="col">
                  {{ t("$field.history.prevRecordTotal") }}
                </th>
                <th scope="col">
                  {{ t("$field.history.recordAmount") }}
                </th>
                <th scope="col">
                  {{ t("$field.history.recordTotal") }}
                </th>
              </tr>
            </template>
            <template #tbody>
              <template v-for="row in data.list" :key="`row-${row.id}`">
                <tr class="hover:bg-gray-100">
                  <td class="text-center">
                    {{
                      row.createdAt
                        ? row.createdAt.replace(/T|Z/gi, " ")
                        : row.createdAt
                    }}
                  </td>
                  <td class="text-center">
                    {{
                      row.type === 1 ? "簽到" : row.type === 2 ? "任務" : "錯誤"
                    }}
                  </td>
                  <td class="text-center">
                    {{
                      row.recordAmountType === 1
                        ? "入金"
                        : row.recordAmountType === -1
                        ? "出金"
                        : "錯誤"
                    }}
                  </td>
                  <td class="text-center">{{ row.prevRecordTotal }}</td>
                  <td class="text-center">
                    {{ row.recordAmount }}
                  </td>
                  <td class="text-center">{{ row.recordTotal }}</td>
                </tr>
              </template>
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
      </div>
    </template>
  </Modal>
</template>
<script>
import { reactive, computed, inject } from "vue";
import { useStore } from "vuex";

/** components */
import Table from "@/widgets/table";
import Pagination from "@/widgets/pagination";
import Modal from "@/widgets/modal";

export default {
  name: "AccountMemberGoldHistoryModal",
  props: {
    show: Boolean,
    id: String,
  },
  components: {
    Table,
    Pagination,
    Modal,
  },
  emits: ["update:show", "success"],
  setup(props, { emit }) {
    const store = useStore();
    const t = inject("t");
    const conditions = reactive({
      id: computed(() => props.id),
      pageIndex: 1,
      pageSize: 20,
    });
    const data = reactive({
      total: 0,
      list: [],
    });

    const fetch = async () => {
      const res = await store.dispatch(
        "account/member/read/gold/history",
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

    const onBeforeShown = () => {
      fetch();
    };

    const onAfterHidden = () => {
      data.list = [];
      data.total = 0;
    };

    const onClose = () => {
      emit("update:show", false);
    };

    return {
      t,
      conditions,
      data,
      fetch,
      onBeforeShown,
      onAfterHidden,
      onClose,
    };
  },
};
</script>
