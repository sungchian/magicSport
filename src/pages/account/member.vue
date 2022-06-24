<template>
  <div>
    <h1 class="page-header">{{ t("$current.page.title") }}</h1>
    <div class="page-toolbar">
      <div class="page-toolbar__conditions">
        <div class="w-full md:w-48">
          <input
            type="text"
            class="form-control"
            v-model="conditionTemp.account"
            :placeholder="t('$field.account')"
          />
        </div>
        <div class="w-full md:w-48">
          <input
            type="text"
            class="form-control"
            v-model="conditionTemp.username"
            :placeholder="t('$field.username')"
          />
        </div>
        <Search @click="search" />
        <Clear @click="onClear" />
      </div>
      <div class="page-toolbar__actions">
        <Remove @click="onRemove" :invalid="checkboxes.items.length === 0" />
        <Filter
          v-model="conditions.filter"
          :options="[
            { value: 'account', children: t('$field.account') },
            { value: 'username', children: t('$field.username') },
            { value: 'sex', children: t('$field.sex') },
            { value: 'birthday', children: t('$field.birthday') },
            { value: 'registerType', children: t('$field.registerType') },
            { value: 'img', children: t('$field.img') },
            { value: 'isEnable', children: t('$field.isEnable') },
            { value: 'isSystemAdmin', children: t('$field.isSystemAdmin') },
            { value: 'isArticleAudit', children: t('$field.isArticleAudit') },
            { value: 'totalCoin', children: t('$field.totalCoin') },
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
      <Table :isEmpty="data.list.length === 0">
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
            <th scope="col" data-filter="sex">
              {{ t("$field.sex") }}
            </th>
            <th scope="col" data-filter="birthday" class="w-48">
              {{ t("$field.birthday") }}
            </th>
            <th scope="col" data-filter="registerType">
              {{ t("$field.registerType") }}
            </th>
            <th scope="col" data-filter="img">
              {{ t("$field.img") }}
            </th>
            <th scope="col" data-filter="isEnable">
              {{ t("$field.isEnable") }}
            </th>
            <th scope="col" data-filter="isSystemAdmin">
              {{ t("$field.isSystemAdmin") }}
            </th>
            <th scope="col" data-filter="isArticleAudit">
              {{ t("$field.isArticleAudit") }}
            </th>
            <th scope="col" data-filter="totalCoin">
              {{ t("$field.totalCoin") }}
            </th>
            <th scope="col" class="w-48">
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
            <td class="text-center">
              <Tooltip :content="t('$field.phone')">
                {{ row.account }}
              </Tooltip>
            </td>
            <td class="text-center">{{ row.username }}</td>
            <td v-if="row.sex === 0" class="text-center text-blue-600 text-lg">
              <i class="fas fa-mars"></i>
            </td>
            <td v-else class="text-center text-red-500 text-lg">
              <i class="fas fa-venus"></i>
            </td>
            <td class="text-center">
              {{ row.birthday ? row.birthday.substring(0, 10) : row.birthday }}
            </td>
            <td v-if="row.registerType === 1" class="text-center">
              <span
                class="bg-yellow-300 mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-500"
                >IOS</span
              >
            </td>
            <td v-else-if="row.registerType === 2" class="text-center">
              <span
                class="bg-teal-500 mr-2 px-2.5 py-0.5 rounded dark:bg-teal-500"
                >ANDROID</span
              >
            </td>
            <td v-else class="text-center">
              <span
                class="bg-red-400 mr-2 px-2.5 py-0.5 rounded dark:bg-red-700 dark:text-red-900"
                >BROWSER</span
              >
            </td>

            <td class="text-center">
              <img class="mx-auto" :src="row.img" style="height: 2rem" />
            </td>
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
                :true-value="t('$field.isSystemAdmin.enabled')"
                :false-value="t('$field.isSystemAdmin.disabled')"
              />
            </td>
            <td class="text-center">
              <IconStatus
                :enabled="row.isArticleAudit"
                :true-value="t('$field.isArticleAudit.enabled')"
                :false-value="t('$field.isArticleAudit.disabled')"
              />
            </td>
            <td class="text-center">
              <Tooltip :content="t('$field.totalCoinHistory')">
                <a
                  href="#"
                  class="text-blue-600 font-medium"
                  @click.prevent="onGoldHistory({ id: row.id })"
                >
                  {{ row.totalCoin }}
                </a>
              </Tooltip>
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
                v-if="row.isArticleAudit"
                :confirmTitle="
                  t('$current.disabled.isAudit.confirm.title', {
                    account: row.username,
                  })
                "
                :confirmText="t('$current.disabled.isAudit.confirm.text')"
                @click="
                  (done) =>
                    onToggleStatus(done, {
                      id: row.id,
                      index: idx,
                      isAudit: row.isArticleAudit,
                      username: row.username,
                      disabled: true,
                    })
                "
              >
                {{ t("$field.isAudit.disabled") }}
              </Disabled>
              <Enabled
                v-else
                :confirmTitle="
                  t('$current.enabled.isAudit.confirm.title', {
                    account: row.username,
                  })
                "
                :confirmText="t('$current.enabled.isAudit.confirm.text')"
                @click="
                  (done) =>
                    onToggleStatus(done, {
                      id: row.id,
                      index: idx,
                      isAudit: row.isArticleAudit,
                      username: row.username,
                      disabled: false,
                    })
                "
              >
                {{ t("$field.isAudit.enabled") }}
              </Enabled>

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
                    onToggleEnable(done, {
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
                    onToggleEnable(done, {
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
    <GoldHistoryModal
      v-model:show="modal.goldHistory"
      :id="modal.goldHistoryId"
    />
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed, provide } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useCheckboxes from "@/hooks/use-checkboxes2";

// component
import Tooltip from "@/widgets/tooltip";
import Button from "@/widgets/button";
import Search from "@/widgets/actions/search";
import Clear from "@/widgets/actions/clear";
import Enabled from "@/widgets/actions/enabled";
import Disabled from "@/widgets/actions/disabled";
import Table from "@/widgets/table";
import Pagination from "@/widgets/pagination";
import Remove from "@/widgets/actions/remove";
import Filter from "@/widgets/actions/filter";
import Export from "@/widgets/actions/export";
import Printer from "@/widgets/actions/printer";
import IconStatus from "@/widgets/icon-status";
import CreateModal from "@/page-widgets/account/member/create-modal";
import UpdateModal from "@/page-widgets/account/member/update-modal";
import GoldHistoryModal from "@/page-widgets/account/member/gold-history-modal";
/** components */
import { mergeDeepRight, forEach, map, pick } from "ramda";

export default {
  breadcrumb: ["MODULE_ACCOUNT", "ACCOUNT_MEMBER"],
  components: {
    Tooltip,
    Button,
    Search,
    Clear,
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
    GoldHistoryModal,
  },
  setup() {
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.account.member",
      $field: "$current.field",
    });
    provide("t", t);

    const [checkboxes, checkReset] = useCheckboxes({
      itemValues: computed(() => data.list),
    });

    const conditions = reactive({
      pageIndex: 1,
      pageSize: 20,
      account: "",
      username: "",
    });

    const conditionTemp = reactive({
      account: "",
      username: "",
    });

    const data = reactive({
      total: 0,
      list: [],
    });

    const modal = reactive({
      create: false,
      update: false,
      updateData: {},
      goldHistory: false,
      goldHistoryData: {},
    });

    const fetch = async () => {
      data.list = [];
      const res = await store.dispatch("account/member/read/list", conditions);
      if (res.state === 0) {
        data.list = res.result.rows === null ? [] : res.result.rows;
        data.total = res.result.totalPages;
      } else {
        data.list = [];
        data.total = 0;
      }
    };

    const search = () => {
      conditions.account = conditionTemp.account;
      conditions.username = conditionTemp.username;
      conditions.pageIndex = 1;
      conditions.pageSize = 20;
      fetch();
    };

    const onClear = () => {
      conditionTemp.account = "";
      conditionTemp.username = "";
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
      const res = await store.dispatch("account/member/disable", itemsId);
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
      const res = await store.dispatch("account/member/read/one", {
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
      console.log(payload);
      data.list[idx.value] = mergeDeepRight(data.list[idx.value], payload);
    };

    const onGoldHistory = ({ id }) => {
      modal.goldHistory = true;
      modal.goldHistoryId = id;
    };

    const onToggleStatus = async (
      done,
      { id, index, isAudit, username, disabled }
    ) => {
      const res = await store.dispatch("account/member/update/audit", {
        id: id,
        isAudit: !isAudit,
      });
      done();
      if (res.state === 0) {
        store.commit("app/set/alert", {
          type: "success",
          message: disabled
            ? t("$current.disabled.isAudit.success", { account: username })
            : t("$current.enabled.isAudit.success", { account: username }),
        });
        data.list[index].isArticleAudit = res.result.isAudit;
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

    const onToggleEnable = async (
      done,
      { id, index, isEnable, username, disabled }
    ) => {
      const res = await store.dispatch("account/member/disableOne", {
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

    return {
      t,
      checkboxes,
      conditions,
      conditionTemp,
      data,
      modal,
      fetch,
      search,
      onClear,
      onRemove,
      onCreate,
      onUpdate,
      idx,
      updateOne,
      onGoldHistory,
      onToggleStatus,
      onToggleEnable,
    };
  },
};
</script>

<style scoped>
button {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
button:hover {
  transform: translateY(1px);
}

.text-lg {
  font-size: 1.25rem;
}
</style>
