<template>
  <Dropdown
    placement="left"
    :menu-height="virtual ? 'auto' : 'fixed'"
    @dropdown="onDropdown"
  >
    <template #trigger="{ isOpen, onOpen }">
      <div
        class="form-control flex justify-between items-center"
        :readonly="readonly"
        :class="{
          'form-control--focus': isOpen,
          'form-control__head': alignType === 'head',
          'form-control__tail': alignType === 'tail',
        }"
        @click="() => (readonly ? false : onOpen())"
      >
        <template v-if="actives.length > 0 || actives.hasOwnProperty('value')">
          <div v-if="isMultiple" class="flex gap-1 flex-wrap">
            <span
              v-for="tag in actives"
              :key="`tag-${tag}`"
              class="dropdown__content__body__tag cursor-pointer hover:bg-gray-300"
              @click.stop="tag.$onClick"
            >
              {{ tag.children.name_en }}
              <svg
                class="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
          <span
            v-else
            class="flex-auto w-10/12 overflow-hidden overflow-ellipsis"
          >
            {{ actives.children ? actives.children : actives }}
          </span>
        </template>
        <span
          v-else
          class="flex-auto w-11/12 overflow-hidden overflow-ellipsis"
        >
          {{ placeholder }}
        </span>
        <b
          v-if="isOpen"
          class="cursor-pointer flex-grow-0 flex-shrink-0 w-auto"
        >
          <svg
            class="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            ></path>
          </svg>
        </b>
        <b v-else class="flex-grow-0 flex-shrink-0 w-auto">
          <svg
            class="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </b>
      </div>
    </template>
    <template #content>
      <div :style="`width: ${contentWidth}px`">
        <div v-if="input" class="py-2 px-3 bg-white sticky top-0">
          <input
            type="text"
            v-model="keyword"
            :placeholder="inputPlaceholder"
            class="form-control"
            @changed="onSearch"
          />
        </div>
        <div v-if="display.length === 0" class="dropdown__content__header">
          <span class="block text-sm text-gray-400">Empty.</span>
        </div>
        <div
          v-else-if="virtual"
          class="dropdown__content__body dropdown__content__body--virtual"
        >
          <VirtualList
            :init-list="display"
            v-bind="{
              displayCount: 10,
              unitHeight: 30,
              activeIndex: actives[0]?.$index ?? 0,
              ...virtual,
            }"
          >
            <template v-slot="{ item }">
              <template v-if="hasTemplate">
                <slot
                  :item="item"
                  :active="item.$active"
                  @click="item.$onClick"
                ></slot>
              </template>
              <template v-else>
                <a
                  href="#"
                  class="dropdown__content__body__item"
                  :class="{
                    'dropdown__content__body__item--active': item.$active,
                    'dropdown__content__body__item--disabled': item.disabled,
                  }"
                  @click.prevent="item.$onClick"
                  >{{ item }}</a
                >
              </template>
            </template>
          </VirtualList>
        </div>
        <ul v-else class="dropdown__content__body">
          <template v-if="hasTemplate">
            <slot
              v-for="item in display"
              :key="`item--${item.value}`"
              :item="item"
              :active="item.$active"
              @click="item.$onClick"
            ></slot>
          </template>
          <li v-else v-for="item in display" :key="`item--${item.value}`">
            <a
              href="#"
              class="dropdown__content__body__item"
              :class="{
                'dropdown__content__body__item--active': item.$active,
                'dropdown__content__body__item--disabled': item.disabled,
              }"
              @click.prevent="item.$onClick"
            >
              {{ item.children }}
            </a>
          </li>
        </ul>
      </div>
    </template>
  </Dropdown>
</template>
<script>
import { computed, ref, watch } from "vue";
import Dropdown from "@/widgets/dropdown";
import VirtualList from "@/widgets/virtual-list";
import { map, reject, equals, addIndex, includes } from "ramda";
export default {
  name: "WidgetSelect",
  props: {
    modelValue: {},
    placeholder: String,
    input: {
      type: Boolean,
      default: false,
    },
    inputPlaceholder: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    options: Array,
    /** 對齊位置 */
    alignType: {
      type: String,
      default: "normal",
      validator: function (value) {
        return value === "normal" || value == "head" || value == "tail";
      },
    },
    tagSportType: String,
    /** 虛擬內容，用於資料量大時候 */
    virtual: {
      type: [Boolean, Object],
      default: false,
    },
  },
  emits: ["update:modelValue", "changed"],
  components: {
    Dropdown,
    VirtualList,
  },
  setup(props, { emit, slots }) {
    /** dropdown 元件 */
    const dropdownRef = ref();
    /** 關鍵字 */
    const keyword = ref("");
    /** 內容寬度 */
    const contentWidth = ref(0);
    /** 檢查是不是有 slot(children) 有的話視為自訂內容 */
    const hasTemplate = computed(() => !!slots.default);
    /** 由綁定的型別去識別單選還是多選 */
    const isMultiple = computed(() => Array.isArray(props.modelValue));
    // 這邊寫死searchResult 直接是陣列
    const searchResult = ref([]);
    /**
     * 對 props.option 做處理
     * 寫入一些需要用到的參數
     *
     * @params {Number} $index 索引值
     * @params {Boolean} $active 已選擇資料
     * @params {Function} $onClick 點擊行為
     */
    const optionsComputed = computed(() => {
      return addIndex(map)((option, idx) => {
        const item = {
          ...option,
          $index: idx,
        };
        return {
          ...item,
          $onClick: () => {
            onChanged(item);
          },
        };
      }, props.options);
    });

    const display = computed(() => {
      return optionsComputed.value;
    });

    const actives = computed(() => {
      if (isMultiple.value) {
        searchResult.value = props.modelValue;
        // console.log(searchResult.value);
        return addIndex(map)((children, idx) => {
          const item = {
            children,
            $index: idx,
          };
          return {
            ...item,
            $onClick: () => {
              onChanged(item);
            },
          };
        }, searchResult.value);
      } else {
        searchResult.value = props.modelValue;
        return searchResult.value;
      }
    });
    /**
     * Dropdown onMounted 時會被呼叫
     * 內容寬度設定為 trigger 寬度
     *
     * @param {Dropdown} dropdown
     */
    const onDropdown = (dropdown) => {
      // 這邊dropdown好像是單選才有的
      // console.log("dropdown", dropdown.value);
      dropdownRef.value = dropdown;
      contentWidth.value = dropdown.trigger.getBoundingClientRect().width;
    };
    /** 下拉選單項目的點擊事件 */
    const onChanged = (item) => {
      // item = { value: proxy, children: "xxxx", $index: 0}
      if (item.disabled) return false;
      if (isMultiple.value) {
        /** 判斷當前狀態 */
        console.log("item", item);
        console.log("search", searchResult.value);
        if (includes(item.value, searchResult.value)) {
          console.log("has multiple");
          searchResult.value = reject(equals(item.value), props.modelValue);
          console.log("search", searchResult.value);
        } else if (includes(item.children, searchResult.value)) {
          searchResult.value = reject(equals(item.children), props.modelValue);
        } else {
          //modalValue {0:"name", 1:"name", ...}
          //searchResult same
          console.log("modelV", props.modelValue);
          searchResult.value = [...props.modelValue, item.value];
          console.log("add", searchResult.value);
        }
        emit("update:modelValue", searchResult.value);
      } else {
        emit("update:modelValue", item);
        /** 單選，點擊項目就關閉彈窗 */
        dropdownRef.value.onClose();
      }
      emit("changed", item);
    };

    const onSearch = watch(
      () => keyword.value,
      (value) => {
        emit("search", value);
      }
    );

    /** 監聽下拉視窗開啟狀態 */
    watch(
      () => dropdownRef.value?.isOpen ?? null,
      (isOpen) => {
        if (isOpen === false) {
          /** 關閉時清空關鍵字內容 */
          keyword.value = "";
          optionsComputed.value.length = 0;
        }
      }
    );

    return {
      onDropdown,
      hasTemplate,
      isMultiple,
      display,
      actives,
      keyword,
      contentWidth,
      onSearch,
    };
  },
};
</script>
<style lang="scss" scoped>
.form-control.form-control__head {
  border-radius: 0;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}
.form-control.form-control__tail {
  border-left-width: 0;
  border-radius: 0;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
</style>
