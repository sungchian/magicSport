<template>
  <div>
    <h1 class="page-header">{{ t("$current.page.title") }}</h1>
    <div class="page-toolbar">
      <div class="page-toolbar__conditions">
        <div class="w-full md:w-48">
          <Select
            v-model="conditionTemp.categoryId"
            :placeholder="
              t('form.placeholder.select', {
                field: t('$field.categoryName'),
              })
            "
            :options="options.category"
            input
          >
          </Select>
        </div>
        <div class="w-full md:w-48">
          <input
            type="text"
            class="form-control"
            v-model="conditionTemp.shortContent"
            :placeholder="t('$field.shortContent')"
          />
        </div>
        <div class="w-full md:w-48">
          <input
            type="text"
            class="form-control"
            v-model="conditionTemp.publisher"
            :placeholder="t('$field.publisher')"
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
            { value: 'categoryName', children: t('$field.categoryName') },
            { value: 'shortContent', children: t('$field.shortContent') },
            { value: 'mainImg', children: t('$field.mainImg') },
            { value: 'label', children: t('$field.label') },
            { value: 'greatCount', children: t('$field.greatCount') },
            { value: 'isTop', children: t('$field.isTop') },
            { value: 'publisher', children: t('$field.publisher') },
            { value: 'created', children: t('$field.created') },
            { value: 'updated', children: t('$field.updated') },
          ]"
        />
        <Export />
        <Printer />
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
            <th scope="col" data-filter="categoryName">
              {{ t("$field.categoryName") }}
            </th>
            <th scope="col" data-filter="shortContent">
              {{ t("$field.shortContent") }}
            </th>
            <th scope="col" data-filter="mainImg">
              {{ t("$field.mainImg") }}
            </th>
            <th scope="col" data-filter="label">
              {{ t("$field.label") }}
            </th>
            <th scope="col" data-filter="isTop">
              {{ t("$field.isTop") }}
            </th>
            <th scope="col" data-filter="publisher">
              {{ t("$field.publisher") }}
            </th>
            <th scope="col" data-filter="created" class="w-48">
              {{ t("$field.created") }}
            </th>
            <th scope="col" data-filter="updated" class="w-48">
              {{ t("$field.updated") }}
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
            <td class="text-center">{{ row.categoryName }}</td>
            <td class="text-center">{{ row.shortContent }}</td>
            <td class="text-center">
              <img
                class="mx-auto object-cover"
                :src="row.mainImg"
                style="height: 2rem"
              />
            </td>
            <td class="text-center">{{ row.label }}</td>
            <td class="text-center">
              <IconTop
                :enabled="row.isTop"
                :true-value="t('$field.status.top')"
                :false-value="t('$field.status.disabled')"
              />
            </td>
            <td class="text-center">
              <Tooltip :content="row.publisherAccount">
                {{ row.publisher }}
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
            <td class="text-center space-x-1 whitespace-nowrap">
              <Button
                v-if="!row.reason"
                size="xs"
                type="light"
                @click="(done) => onAudit(done, { id: row.id, index: idx })"
                async
              >
                {{ t("widgets.button.audit") }}
              </Button>
              <Button
                v-else
                size="xs"
                type="red"
                @click="
                  (done) =>
                    onFailed(done, { id: row.id, index: idx }, row.reason)
                "
                async
              >
                {{ t("widgets.button.audit.fail") }}
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
    <AuditModal
      v-model:show="modal.audit"
      :data="modal.auditData"
      :articleTypes="articleTypes"
      @success="fetch"
    />
    <FailAudit
      v-model:show="modal.failed"
      :data="modal.failedData"
      :articleTypes="articleTypes"
      :reason="failReason"
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
import Select from "@/widgets/select";
import Search from "@/widgets/actions/search";
import Clear from "@/widgets/actions/clear";
import Table from "@/widgets/table";
import Pagination from "@/widgets/pagination";
import Remove from "@/widgets/actions/remove";
import Filter from "@/widgets/actions/filter";
import Export from "@/widgets/actions/export";
import Printer from "@/widgets/actions/printer";
import IconTop from "@/widgets/icon-top";
import AuditModal from "@/page-widgets/article/audit/audit-modal";
import FailAudit from "@/page-widgets/article/audit/fail-audit-modal.vue";

/** components */

/** constants */
import articleTypes from "@/constants/article-types";

export default {
  breadcrumb: ["MODULE_ARTICLE", "ARTICLE_AUDIT"],
  components: {
    Tooltip,
    Button,
    Select,
    Search,
    Clear,
    Table,
    Pagination,
    Remove,
    Filter,
    Export,
    Printer,
    IconTop,
    AuditModal,
    FailAudit,
  },
  setup() {
    const formImg = ref();
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.article.audit",
      $field: "$current.field",
    });

    const [checkboxes, checkReset] = useCheckboxes({
      // itemValues: computed(() => pluck("id", data.list)),
      itemValues: computed(() => data.list),
    });

    const conditions = reactive({
      filter: [
        "categoryName",
        "shortContent",
        "mainImg",
        "label",
        "isTop",
        "publisher",
        "greatCount",
        "created",
        "updated",
      ],
      pageIndex: 1,
      pageSize: 20,
      categoryId: "",
      shortContent: "",
      publisher: "",
    });

    const conditionTemp = reactive({
      categoryId: "",
      shortContent: "",
      publisher: "",
    });

    const options = reactive({
      category: [],
    });

    const data = reactive({
      total: 0,
      list: [],
    });

    const modal = reactive({
      audit: false,
      failed: false,
      auditData: {},
      failedData: {},
    });

    const saveSort = ref(false);

    const fetch = async () => {
      const res = await store.dispatch("article/audit/read/list", conditions);
      if (res.state === 0) {
        data.list = res.result.rows === null ? [] : res.result.rows;
        data.total = res.result.totalPages;
      } else {
        data.list = [];
        data.total = 0;
      }
    };

    const getCategory = async () => {
      const conditions = reactive({
        pageIndex: 1,
        pageSize: 100,
      });
      const res = await store.dispatch(
        "article/category/article/category",
        conditions
      );
      if (res.state === 0) {
        options.category = res.result.rows.map((item) => {
          return { value: item.id, children: item.name };
        });
      }
    };

    const search = () => {
      conditions.categoryId = conditionTemp.categoryId;
      conditions.shortContent = conditionTemp.shortContent;
      conditions.publisher = conditionTemp.publisher;
      conditions.pageIndex = 1;
      conditions.pageSize = 20;
      fetch();
    };

    const onClear = () => {
      conditionTemp.categoryId = "";
      conditionTemp.shortContent = "";
      conditionTemp.publisher = "";
    };

    onMounted(() => {
      fetch();
      getCategory();
    });

    const onRemove = async (done) => {
      const res = await store.dispatch(
        "article/audit/delete",
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

    const onAudit = async (done, { id, index }) => {
      const res = await store.dispatch("article/audit/read/one", {
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
        modal.audit = true;
        modal.auditData = res.result;
      }
    };

    const failReason = ref();
    const onFailed = async (done, { id, index }, reason) => {
      const res = await store.dispatch("article/audit/read/one", {
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
        modal.failed = true;
        modal.failedData = res.result;
        failReason.value = reason;
      }
    };

    let idx = ref();
    return {
      saveSort,
      t,
      checkboxes,
      conditions,
      conditionTemp,
      options,
      data,
      modal,
      fetch,
      search,
      onClear,
      articleTypes,
      onRemove,
      onAudit,
      onFailed,
      formImg,
      idx,
      failReason,
    };
  },
};
</script>
