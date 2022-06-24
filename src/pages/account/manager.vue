<template>
  <div>
    <h1 class="page-header">{{ t("$current.page.title") }}</h1>
    <div class="page-toolbar">
      <div class="page-toolbar__actions">
        <Remove @click="onRemove" :invalid="checkboxes.items.length === 0" />
        <Filter
          v-model="conditions.filter"
          :options="[
            { value: 'account', children: t('$field.account') },
            { value: 'username', children: t('$field.username') },
            { value: 'isEnable', children: t('$field.isEnable') },
            { value: 'isSystemAdmin', children: t('$field.isSystemAdmin') },
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
            <th scope="col" data-filter="account">
              {{ t("$field.account") }}
            </th>
            <th scope="col" data-filter="username">
              {{ t("$field.username") }}
            </th>
            <th scope="col" data-filter="isEnable">
              {{ t("$field.isEnable") }}
            </th>
            <th scope="col" data-filter="isSystemAdmin">
              {{ t("$field.isSystemAdmin") }}
            </th>
            <th scope="col" data-filter="createdBy">
              {{ t("$field.createdBy") }}
            </th>
            <th scope="col" data-filter="updatedBy">
              {{ t("$field.updatedBy") }}
            </th>
            <th scope="col" data-filter="created">
              {{ t("$field.created") }}
            </th>
            <th scope="col" data-filter="updated">
              {{ t("$field.updated") }}
            </th>
            <th scope="col" class="w-24">
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
            <td class="text-center">{{ row.account }}</td>
            <td class="text-center">{{ row.username }}</td>
            <td class="text-center">
              <IconStatus
                :enabled="row.isEnable"
                :true-value="t('$field.status.enabled')"
                :false-value="t('$field.status.disabled')"
              />
            </td>
            <td class="text-center">
              <IconStatus
                :enabled="row.isSystemAdmin"
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
              <Disabled
                v-if="row.isEnable"
                :confirmTitle="
                  t('$current.disabled.confirm.title', {
                    account: row.username,
                  })
                "
                :confirmText="t('$current.disabled.confirm.text')"
                @click="
                  (done) =>
                    onToggleStatus(done, {
                      id: row.id,
                      index: idx,
                      isEnable: row.isEnable,
                      username: row.username,
                      disabled: true,
                    })
                "
              >
                {{ t("$field.status.disabled") }}
              </Disabled>
              <Enabled
                v-else
                :confirmTitle="
                  t('$current.enabled.confirm.title', { account: row.username })
                "
                :confirmText="t('$current.enabled.confirm.text')"
                @click="
                  (done) =>
                    onToggleStatus(done, {
                      id: row.id,
                      index: idx,
                      isEnable: row.isEnable,
                      username: row.username,
                      disabled: false,
                    })
                "
              >
                {{ t("$field.status.enabled") }}
              </Enabled>
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
    <CreateModal v-model:show="modal.create" @success="fetch" />
    <UpdateModal
      v-model:show="modal.update"
      :data="modal.updateData"
      @success="updateOne"
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
import Enabled from "@/widgets/actions/enabled";
import Disabled from "@/widgets/actions/disabled";
import Table from "@/widgets/table";
import Pagination from "@/widgets/pagination";
import Remove from "@/widgets/actions/remove";
import Filter from "@/widgets/actions/filter";
import Export from "@/widgets/actions/export";
import Printer from "@/widgets/actions/printer";
import IconStatus from "@/widgets/icon-status";
import CreateModal from "@/page-widgets/account/manager/create-modal";
import UpdateModal from "@/page-widgets/account/manager/update-modal";

/** components */
import { mergeDeepRight, forEach, pick, map } from "ramda";

export default {
  breadcrumb: ["MODULE_ACCOUNT", "ACCOUNT_MANAGER"],
  components: {
    Tooltip,
    Button,
    Enabled,
    Disabled,
    Table,
    Pagination,
    Remove,
    Filter,
    Export,
    Printer,
    IconStatus,
    CreateModal,
    UpdateModal,
  },
  setup() {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.account.manager",
      $field: "$current.field",
    });

    const [checkboxes, checkReset] = useCheckboxes({
      // itemValues: computed(() => pluck("id", data.list)),
      itemValues: computed(() => data.list),
    });

    const conditions = reactive({
      filter: [
        "account",
        "username",
        "isEnable",
        "isSystemAdmin",
        "created",
        "updated",
        "createdBy",
        "updatedBy",
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
      const res = await store.dispatch("account/manager/read/list", conditions);
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
      let itemsId = [];
      forEach((checkbox) => {
        itemsId.push(
          map((item) => ({ id: item, isEnable: false }), pick(["id"], checkbox))
            .id
        );
      }, checkboxes.items);
      const res = await store.dispatch("account/manager/disable", itemsId);
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

    const onCreate = () => {
      modal.create = true;
    };

    const onUpdate = async (done, { id, index }) => {
      const res = await store.dispatch("account/manager/read/one", {
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

    const onToggleStatus = async (
      done,
      { id, index, isEnable, username, disabled }
    ) => {
      const res = await store.dispatch("account/manager/disableOne", {
        id: id,
        isEnable: !isEnable,
      });
      done();
      if (res.state === 0) {
        store.commit("app/set/alert", {
          type: "success",
          message: disabled
            ? t("$current.disabled.success", { account: username })
            : t("$current.enabled.success", { account: username }),
        });
        data.list[index].isEnable = res.result[0].isEnable;
      } else {
        const reason = t(`error.${res.error[0].message}`);
        store.commit("app/set/alert", {
          type: "danger",
          message: disabled
            ? t("feedback.disabled.failed", { reason })
            : t("feedback.enabled.failed", { reason }),
        });
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
      data,
      modal,
      fetch,
      onRemove,
      onCreate,
      onUpdate,
      idx,
      updateOne,
      onToggleStatus,
    };
  },
};
</script>
