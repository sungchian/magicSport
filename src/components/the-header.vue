<template>
  <nav class="bg-white border-b border-gray-200 fixed w-min z-30 h-16">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-around">
        <div class="flex items-center justify-start">
          <a class="header-title">
            <span class="header-title__text">這邊到時候換img</span>
          </a>
          <ul class="list-none pl-2.5 lg:pl-12 lg:flex hidden">
            <router-link
              v-for="category in categories"
              :key="category.code"
              :data-link="category.to"
              :to="category.to"
              class="inline-flex px-5 items-center whitespace-nowrap -my-8 font-medium cursor-pointer hover:bg-gray-200"
              :class="[category.active && 'header-nav--active']"
            >
              <li>
                {{ category.content }}
              </li>
            </router-link>
          </ul>
        </div>
        <div class="flex items-center">
          <a
            class="inline-flex p-2 mr-2 rounded items-center font-medium cursor-pointer hover:bg-gray-200 text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </a>
          <a
            class="inline-flex p-2 mr-2 rounded items-center font-medium cursor-pointer hover:bg-gray-200 text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </a>
          <Dropdown class="inline-flex" placement="right">
            <template #trigger="{ onOpen }">
              <a
                class="p-2 rounded flex items-center font-medium cursor-pointer hover:bg-gray-200 text-gray-600"
                @click="onOpen"
              >
                <span>{{ userName }}</span>
                <b class="ml-2">
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
              </a>
            </template>
            <template #content="{ onClose }">
              <div class="w-40 divide-y divide-gray-100">
                <div class="dropdown__content__header">
                  <span class="block text-sm">{{ userName }}</span>
                  <span class="block text-sm font-medium truncat">管理員</span>
                </div>
                <ul class="dropdown__content__body">
                  <li>
                    <router-link
                      to="/setting/user-info"
                      class="dropdown__content__body__item"
                      @click="onClose"
                    >
                      個人資料
                    </router-link>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="dropdown__content__body__item"
                      @click.prevent="onClose"
                    >
                      帳號設定
                    </a>
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    href="#"
                    @click.prevent="logout"
                    class="dropdown__content__body__item"
                  >
                    登出
                  </a>
                </div>
              </div>
            </template>
          </Dropdown>
          <button
            class="flex lg:hidden text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            @click="toggleTopNav"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="fixed inset-0 z-20 lg:hidden" v-show="topnav">
    <ul class="list-none mt-16 p-4 bg-white">
      <router-link
        v-for="category in categories"
        :key="category.code"
        :data-link="category.to"
        :to="category.to"
        class="flex px-4 py-2 items-center rounded font-medium cursor-pointer"
        :class="[category.active && 'bg-gray-200']"
        @click="toggleTopNav"
      >
        <li>
          {{ category.content }}
        </li>
      </router-link>
    </ul>
  </div>
  <div
    v-show="topnav"
    class="bg-gray-900 opacity-50 fixed inset-0 z-10 lg:hidden"
    @click="toggleTopNav"
  ></div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import useI18n from "@/hooks/use-i18n";
/** constant */
import { modules, paths } from "@/constants/nav";
import tree from "@/constants/_tree";
/** widget */
import Dropdown from "@/widgets/dropdown";
/** helper */
import { map, split, keys } from "ramda";
export default {
  name: "TheHeader",
  components: {
    Dropdown,
  },
  props: {
    topnav: Boolean,
    leftnav: Boolean,
  },
  emits: ["update:topnav", "update:leftnav"],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();
    const userName = computed(() => {
      return store.state.auth.user.username;
    });
    const tempCategories = computed(() => {
      const [, cate] = split("/", store.state.route.path);
      const getFirstChildLink = (node) =>
        node
          ? paths[node.children[0]?.code] ?? getFirstChildLink(node.children[0])
          : null;
      return map(
        (code) => ({
          code,
          to: getFirstChildLink(tree[code]),
          content: t(`node.${code}`),
          active: cate === modules[code],
        }),
        keys(tree)
      );
    });
    const categories = computed(() => {
      return tempCategories.value.filter((item) => {
        return item.code !== "MODULE_SETTING";
      });
    });
    const toggleTopNav = () => {
      emit("update:leftnav", false);
      emit("update:topnav", !props.topnav);
    };
    const toggleLeftNav = () => {
      emit("update:topnav", false);
      emit("update:leftnav", !props.leftnav);
    };
    const logout = async () => {
      await store.dispatch("auth/logout", {
        type: "success",
        status: "logout",
      });
    };
    return {
      t,
      userName,
      categories,
      open,
      toggleTopNav,
      toggleLeftNav,
      logout,
    };
  },
};
</script>
