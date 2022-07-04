<template>
  <nav
    class="bg-white border-b border-gray-200 fixed w-min z-30 h-16 flex items-center justify-around s01"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-around">
        <div class="flex items-center justify-start">
          <a class="header-title">
            <span class="header-title__text flex items-center">
              <img
                src="../assets/images/icon_logo_header.png"
                alt=""
                class="w-10 h-12"
              />
              <img
                src="../assets/images/icon_logo_name.png"
                alt=""
                class="h-10"
              />
            </span>
          </a>
          <ul class="list-none pl-2.5 lg:pl-12 lg:flex hidden">
            <router-link
              v-for="category in categories"
              :key="category.code"
              :data-link="category.to"
              :to="category.to"
              class="inline-flex px-5 items-center whitespace-nowrap -my-8 font-medium cursor-pointer hover:bg-gray-200 text-lg"
              :class="[category.active && 'header-nav--active']"
            >
              <li>
                {{ category.content }}
              </li>
            </router-link>
          </ul>
        </div>
        <div class="flex items-center">
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
/** helper */
import { map, split, keys } from "ramda";
export default {
  name: "TheHeader",
  components: {},
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
