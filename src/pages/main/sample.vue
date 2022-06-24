<template>
  <div>
    <h1 class="page-header">管理列表</h1>
    <div class="page-toolbar">
      <div class="page-toolbar__conditions">
        <div class="w-full md:w-48">
          <DatetimePicker
            v-model="conditions.start"
            placeholder="請選擇起始時間"
            :max-date-time="conditions.end"
            input
          />
        </div>
        <div class="w-full md:w-48">
          <DatetimePicker
            v-model="conditions.end"
            placeholder="請選擇終止時間"
            :min-date-time="conditions.start"
            input
          />
        </div>
        <div class="w-full md:w-32">
          <Select
            v-model="conditions.status"
            placeholder="狀態"
            :options="[
              {
                value: 'on',
                children: '啟動',
              },
              {
                value: 'off',
                children: '禁止',
              },
            ]"
          >
          </Select>
        </div>
        <div class="w-full md:w-48">
          <input
            type="text"
            class="form-control"
            v-model="conditions.keyword"
            placeholder="請輸入關鍵字"
          />
        </div>
      </div>
      <div class="page-toolbar__actions">
        <Remove @click="onRemove" :invalid="checkboxes.items.length === 0" />
        <Filter
          v-model="conditions.filter"
          :options="[
            { value: 'name', children: '名稱' },
            { value: 'field1', children: '欄目1' },
            { value: 'field2', children: '欄目2' },
            { value: 'field3', children: '欄目3' },
            { value: 'field4', children: '欄目4' },
            { value: 'field5', children: '欄目5' },
            { value: 'field6', children: '欄目6' },
            { value: 'status', children: '狀態' },
            { value: 'history', children: '用戶足跡' },
            { value: 'created', children: '建立時間' },
          ]"
        />
      </div>
      <div class="page-toolbar__buttons">
        <Button @click="onCreate">
          <i class="fas fa-plus"></i>
          <span class="ml-2">新增資料</span>
        </Button>
      </div>
    </div>
    <div class="page-content">
      <Table :filter="conditions.filter">
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
                  class="form-checkbox bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                />
              </div>
            </th>
            <th scope="col" class="w-10 text-center">#</th>
            <th scope="col" class="text-left" data-filter="name">
              <Sort
                v-model:orderName="conditions.sortName"
                v-model:orderBy="conditions.sortBy"
                value="name"
              >
                名稱
              </Sort>
            </th>
            <th scope="col" class="text-left" data-filter="field1">
              <Sort
                v-model:orderName="conditions.sortName"
                v-model:orderBy="conditions.sortBy"
                value="field1"
                defaultOrder="asc"
              >
                欄目1
              </Sort>
            </th>
            <th scope="col" class="text-left" data-filter="field2">欄目2</th>
            <th scope="col" class="text-left" data-filter="field3">欄目3</th>
            <th scope="col" class="text-left" data-filter="field4">欄目4</th>
            <th scope="col" class="text-left" data-filter="field5">欄目5</th>
            <th scope="col" class="text-left" data-filter="field6">欄目6</th>
            <th scope="col" data-filter="status" class="w-24">狀態</th>
            <th scope="col" data-filter="history" class="w-24">用戶足跡</th>
            <th scope="col" data-filter="created" class="w-48">
              <Sort
                v-model:orderName="conditions.sortName"
                v-model:orderBy="conditions.sortBy"
                value="created"
              >
                建立時間
              </Sort>
            </th>
            <th scope="col" class="text-left w-80">操作</th>
          </tr>
        </template>
        <template #tbody>
          <tr
            class="hover:bg-gray-100"
            v-for="i in conditions.perpage"
            :key="`row-${i}`"
          >
            <td class="text-center">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="checkboxes.items"
                  :value="i"
                  class="form-checkbox"
                />
              </div>
            </td>
            <td class="text-center">
              {{ (conditions.page - 1) * conditions.perpage + i }}
            </td>
            <td>Test{{ (conditions.page - 1) * conditions.perpage + i }}</td>
            <td>欄目1</td>
            <td>欄目2</td>
            <td>欄目3</td>
            <td>欄目4</td>
            <td>欄目5</td>
            <td>欄目6</td>
            <td class="text-center">
              <Tooltip v-if="i > 10" class="text-green-500" content="啟用">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Tooltip>
              <Tooltip v-else class="text-red-500" content="禁用">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Tooltip>
            </td>
            <td class="text-center">
              <Tooltip content="用戶足跡">
                <a href="#" class="text-blue-600 font-medium">查看</a>
              </Tooltip>
            </td>
            <td class="text-center">2022-01-22 12:34:56</td>
            <td class="space-x-1 whitespace-nowrap">
              <Button size="xs" type="light" @click="F">修改</Button>
              <Button v-if="i > 10" size="xs" type="red" @click="F">
                停用
              </Button>
              <Button v-else size="xs" type="green" @click="F">啟用</Button>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <div class="page-pagination">
      <Pagination
        :total="100"
        v-model:page="conditions.page"
        v-model:perpage="conditions.perpage"
      />
    </div>
    <Modal size="md" v-model:show="modal.create" @afterHidden="onAfterClose">
      <template #title>新增資料</template>
      <template #body>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="form-group form-group--required col-span-1"
            :class="[invalid.name.$invalid && 'form-group--invalid']"
          >
            <label class="form-group__title">名稱</label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入"
              v-model="form.name"
            />
            <p class="form-group__invalid-message" v-if="invalid.name.$invalid">
              {{ invalid.name.$errors[0]?.$message }}
            </p>
          </div>
          <div class="form-group col-span-1">
            <label class="form-group__title">性別</label>
            <Select
              placeholder="請選擇"
              v-model="form.gender"
              :options="[
                {
                  value: 'M',
                  children: '男',
                },
                {
                  value: 'F',
                  children: '女',
                },
              ]"
            >
            </Select>
          </div>
          <div class="form-group col-span-2">
            <label class="form-group__title">備註</label>
            <textarea
              class="form-control"
              rows="4"
              v-model="form.note"
            ></textarea>
          </div>
        </div>
      </template>
      <template #footer="{ onClose }">
        <Button
          size="md"
          class="w-24"
          @click="(done) => onCreateSubmit({ done, onClose })"
          async
        >
          確認
        </Button>
      </template>
    </Modal>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import useVuelidate, { required } from "@/hooks/use-vuelidate";
import useCheckboxes from "@/hooks/use-checkboxes";

/** components */
import Select from "@/widgets/select";
import Button from "@/widgets/button";
import Table from "@/widgets/table";
import Pagination from "@/widgets/pagination";
import Tooltip from "@/widgets/tooltip";
import Modal from "@/widgets/modal";
import DatetimePicker from "@/widgets/datetime-picker";
import Remove from "@/widgets/actions/remove";
import Filter from "@/widgets/actions/filter";
import Sort from "@/widgets/actions/sort";

/** helper */
import { times, inc } from "ramda";

export default {
  breadcrumb: ["MODULE_MAIN", "MAIN_SAMPLE"],
  components: {
    Select,
    Button,
    DatetimePicker,
    Table,
    Pagination,
    Filter,
    Remove,
    Sort,
    Modal,
    Tooltip,
  },
  setup() {
    const store = useStore();
    const conditions = reactive({
      start: "",
      end: "",
      status: "",
      keyword: "",
      filter: [
        "name",
        "status",
        "field1",
        "field2",
        "field3",
        "field4",
        "field5",
        "field6",
        "history",
        "created",
      ],
      page: 1,
      perpage: 20,
      sortName: "created",
      sortBy: "desc",
    });
    const modal = reactive({
      create: false,
    });
    const form = reactive({
      name: "",
      gender: null,
      note: "",
    });
    const [checkboxes, checkReset] = useCheckboxes({
      itemValues: computed(() => times(inc, conditions.perpage)),
    });
    const rules = { name: { required } };
    const messages = { name: { required: "必填欄位不能為空" } };

    const v = useVuelidate(rules, form, messages);
    const onRemove = (done, password) => {
      setTimeout(function () {
        if (password === "mockok") {
          store.commit("app/set/alert", {
            type: "success",
            message: "刪除成功",
          });
          done();
          checkReset();
        } else {
          store.commit("app/set/alert", {
            type: "danger",
            message: "刪除失敗: 密碼輸入錯誤",
          });
          done();
        }
      }, 3000);
    };
    const onCreate = () => {
      modal.create = true;
    };
    const onCreateSubmit = ({ done, onClose }) => {
      v.value.$touch();
      if (v.value.$invalid) {
        done();
        return false;
      }
      setTimeout(function () {
        store.commit("app/set/alert", {
          type: "success",
          message: "新增成功",
        });
        done();
        onClose();
      }, 1000);
    };
    const onAfterClose = () => {
      v.value.$reset();
      form.name = "";
      form.gender = null;
      form.note = "";
    };

    return {
      conditions,
      F: () => {},
      onRemove,
      onCreate,
      modal,
      form,
      invalid: v.value,
      onCreateSubmit,
      onAfterClose,
      checkboxes,
    };
  },
};
</script>
