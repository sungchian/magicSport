<template>
  <ul>
    <li v-for="node in sidebarList" :key="node.code" class="mb-1">
      <router-link
        v-if="node.path"
        :to="node.path"
        class="text-base text-gray-900 font-normal rounded-lg whitespace-nowrap flex items-center p-2"
        :class="{
          'bg-gray-200': nav.active.includes(node.code),
          'hover:bg-gray-100': !nav.active.includes(node.code),
        }"
      >
        <div class="nav-icon">
          <i :class="node.icon"> </i>
        </div>
        <transition
          name="fade"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
        >
          <span class="ml-3" v-show="open">{{ t(`node.${node.code}`) }}</span>
        </transition>
      </router-link>
      <div v-else-if="node.children.length > 0">
        <a
          href="#"
          @click.prevent="switchOpenGroup(node.code)"
          class="text-base text-gray-900 font-normal rounded-lg whitespace-nowrap p-2 hover:bg-gray-100 flex items-center justify-between mb-1"
        >
          <div class="flex items-center justify-start">
            <div class="nav-icon">
              <i :class="node.icon"> </i>
            </div>
            <transition
              name="fade"
              enter-active-class="animate__animated animate__fadeIn animate__faster"
            >
              <span class="ml-3" v-show="open">{{
                t(`node.${node.code}`)
              }}</span>
            </transition>
          </div>
          <transition
            name="fade"
            enter-active-class="animate__animated animate__fadeIn animate__faster"
          >
            <div
              :class="[
                'transform',
                nav.open === node.code && 'rotate-180',
                open && 'transition-transform duration-75',
              ]"
              v-show="open"
            >
              <i class="fas fa-chevron-down"></i>
            </div>
          </transition>
        </a>
        <the-aside-nav
          :open="open"
          :nodes="node.children"
          v-show="nav.open === node.code"
        />
      </div>
      <a
        v-else
        href="#"
        @click.prevent="() => false"
        class="text-base text-gray-900 font-normal rounded-lg whitespace-nowrap flex items-center p-2 hover:bg-gray-100"
      >
        <div
          class="w-6 h-6 text-gray-500 flex items-center justify-center text-lg"
        >
          <i :class="node.icon"> </i>
        </div>
        <transition
          name="fade"
          enter-active-class="animate__animated animate__fadeIn animate__faster"
        >
          <span class="ml-3" v-show="open">{{ t(`${node.code}`) }}</span>
        </transition>
      </a>
    </li>
  </ul>
</template>
<script>
import { computed, reactive, watch, onMounted } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";

/** constant */
import { paths, icons } from "@/constants/nav";

/** helper */
import { reduce, map } from "ramda";

export default {
  name: "TheAsideNav",
  props: {
    open: Boolean,
    nodes: Array,
  },
  setup(props) {
    const store = useStore();
    const { t } = useI18n();

    const nav = reactive({
      open: "",
      active: computed(() => {
        const check = (obj) =>
          reduce(
            (activeList, node) => {
              if ("path" in node && store.state.route.path === node.path)
                return [...activeList, node.code];
              if ("children" in node) {
                const childCheck = check(node.children);
                if (childCheck.length > 0) {
                  return [...activeList, node.code, ...childCheck];
                }
              }
              return activeList;
            },
            [],
            obj
          );
        return check(sidebarList.value);
      }),
    });

    onMounted(() => {
      nav.open = nav.active[0];
      watch(
        () => nav.active,
        (active) => {
          nav.open = active[0];
        }
      );
    });

    const sidebarList = computed(() => {
      const filterNodeItems = map((node) => {
        const { code, children = [] } = node;
        return {
          code,
          children: filterNodeItems(children),
          path: paths[code] ?? null,
          icon: icons[code] ?? null,
        };
      });
      return filterNodeItems(props.nodes);
    });

    const switchOpenGroup = (code) => {
      if (nav.open === code) nav.open = null;
      else nav.open = code;
    };

    return {
      t,
      nav,
      sidebarList,
      switchOpenGroup,
    };
  },
};
</script>
