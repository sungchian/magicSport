<template>
  <div>
    <h1 class="page-header">{{ t("$current.page.title") }}</h1>
    <div class="page-toolbar">
      <div class="page-toolbar__actions">
        <Remove @click="onRemove" :invalid="checkboxes.items.length === 0" />
        <Filter
          v-model="conditions.filter"
          :options="[
            { value: 'categoryName', children: t('$field.categoryName') },
            { value: 'title', children: t('$field.title') },
            {
              value: 'shortContentANDlink',
              children: t('$field.shortContentANDlink'),
            },
            { value: 'picUrl', children: t('$field.picUrl') },
            { value: 'releaseDatetime', children: t('$field.releaseDatetime') },
            {
              value: 'expirationDatetime',
              children: t('$field.expirationDatetime'),
            },
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
            <!-- <th scope="col" data-filter="categoryId">
              {{ t("$field.categoryId") }}
            </th> -->
            <th scope="col" data-filter="categoryId">
              {{ t("$field.categoryName") }}
            </th>
            <!-- <th scope="col" data-filter="articleId">
              {{ t("$field.articleId") }}
            </th> -->
            <th scope="col" class="w-80" data-filter="title">
              {{ t("$field.title") }}
            </th>
            <th scope="col" class="w-48" data-filter="shortContentANDlink">
              {{ t("$field.shortContentANDlink") }}
            </th>
            <th scope="col" data-filter="picUrl">
              {{ t("$field.picUrl") }}
            </th>
            <th scope="col" class="w-48" data-filter="releaseDatetime">
              {{ t("$field.releaseDatetime") }}
            </th>
            <th scope="col" class="w-48" data-filter="expirationDatetime">
              {{ t("$field.expirationDatetime") }}
            </th>
            <th scope="col" data-filter="createdBy">
              {{ t("$field.createdBy") }}
            </th>
            <th scope="col" data-filter="updatedBy">
              {{ t("$field.updatedBy") }}
            </th>
            <th scope="col" data-filter="created" class="w-24">
              {{ t("$field.created") }}
            </th>
            <th scope="col" data-filter="updated" class="w-24">
              {{ t("$field.updated") }}
            </th>
            <th scope="col" class="w-20">
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
            <td class="text-center">{{ row.title }}</td>
            <td v-if="row.kind === 1" class="text-center">
              <Tooltip :content="t('$field.shortContent')">
                <a
                  :href="row.link"
                  class="text-blue-600 font-medium"
                  @click.prevent="onDisplay({ id: row.articleId })"
                >
                  {{ row.shortContent }}
                </a>
              </Tooltip>
            </td>
            <td v-else class="text-center">
              <Tooltip :content="t('$field.link')">
                <a
                  :href="row.link"
                  class="text-blue-600 font-medium"
                  @click.prevent="onDisplay({ id: row.id })"
                >
                  {{ row.link }}
                </a>
              </Tooltip>
            </td>
            <td class="text-center">
              <img class="mx-auto" :src="row.picUrl" style="height: 2rem" />
            </td>
            <td class="text-center">
              {{
                row.releaseDatetime
                  ? row.releaseDatetime.replace(/T|Z/gi, " ")
                  : row.releaseDatetime
              }}
            </td>
            <td class="text-center">
              {{
                row.expirationDatetime
                  ? row.expirationDatetime.replace(/T|Z/gi, " ")
                  : row.expirationDatetime
              }}
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
            <td class="text-center space-x-1 whitespace-nowrap">
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
    <CreateModal v-model:show="modal.create" @success="fetch" />
    <UpdateModal
      v-model:show="modal.update"
      :data="modal.updateData"
      @success="updateOne"
    />
    <DisplayModal
      v-model:show="modal.display"
      :data="modal.displayData"
      :fullEditor="fullEditor"
      :editorConfig="editorConfig"
      :articleTypes="articleTypes"
    />
  </div>
</template>
<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";
import useCheckboxes from "@/hooks/use-checkboxes2";

// component
import Button from "@/widgets/button";
import Table from "@/widgets/table";
import Tooltip from "@/widgets/tooltip";
import Pagination from "@/widgets/pagination";
import Remove from "@/widgets/actions/remove";
import Filter from "@/widgets/actions/filter";
import Export from "@/widgets/actions/export";
import Printer from "@/widgets/actions/printer";
import CreateModal from "@/page-widgets/article/slide/create-modal";
import UpdateModal from "@/page-widgets/article/slide/update-modal";
import DisplayModal from "@/page-widgets/article/slide/display-modal";

/** components */
import { mergeDeepRight } from "ramda";

/** helper */

export default {
  breadcrumb: ["MODULE_ARTICLE", "ARTICLE_SLIDE_MANAGE"],
  components: {
    Button,
    Table,
    Tooltip,
    Pagination,
    Remove,
    Filter,
    Export,
    Printer,
    CreateModal,
    UpdateModal,
    DisplayModal,
  },
  setup() {
    const formImg = ref();
    const store = useStore();
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.article.slide",
      $field: "$current.field",
    });

    const [checkboxes, checkReset] = useCheckboxes({
      // itemValues: computed(() => pluck("id", data.list)),
      itemValues: computed(() => data.list),
    });

    const conditions = reactive({
      filter: [
        "categoryId",
        "articleId",
        "title",
        "shortContentANDlink",
        "picUrl",
        "releaseDatetime",
        "expirationDatetime",
        "created",
        "createdBy",
        "updated",
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
      display: false,
      displayData: {},
    });

    const saveSort = ref(false);

    const fetch = async () => {
      const res = await store.dispatch("article/slide/read/list", conditions);
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
      console.log(checkboxes.items);
      const res = await store.dispatch(
        "article/slide/delete",
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

    const onCreate = () => {
      modal.create = true;
    };

    const content = ref();

    const onUpdate = async (done, { id, index }) => {
      const res = await store.dispatch("article/slide/read/one", {
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
        content.value = res.result.articleContent;
      }
    };

    const onDisplay = async ({ id }) => {
      const res = await store.dispatch("article/manage/read/one", {
        id,
      });
      // done();
      if (res.state !== 0) {
        store.commit("app/set/alert", {
          type: "danger",
          message: t("feedback.read.failed", {
            reason: t(`error.${res.error[0].message}`),
          }),
        });
      } else {
        modal.display = true;
        modal.displayData = res.result;
      }
    };

    const upload = async (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      formImg.value = files;
      console.log(formImg.value);
    };

    let idx = ref();

    const updateOne = async (payload) => {
      data.list[idx.value] = mergeDeepRight(data.list[idx.value], payload);
    };

    return {
      saveSort,
      t,
      checkboxes,
      conditions,
      data,
      modal,
      fetch,
      onRemove,
      onCreate,
      onUpdate,
      onDisplay,
      content,
      formImg,
      upload,
      idx,
      updateOne,
    };
  },
};
</script>
