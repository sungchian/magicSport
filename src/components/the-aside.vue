<template>
  <aside
    class="aside fixed z-20 h-full top-0 left-0 pt-14 flex lg:flex flex-shrink-0 flex-col transition-width duration-75"
    :class="{
      'w-64': isOpen,
      'lg:w-16': !isOpen,
      hidden: !isOpen,
    }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0"
    >
      <Scrollbar>
        <div class="pt-5 pb-4 px-3">
          <!-- <the-aside-nav :open="isOpen" :nodes="currentNavs" /> -->
        </div>
      </Scrollbar>
    </div>
  </aside>
  <div
    v-show="leftnav"
    @click="closeNav"
    class="aside-drap bg-gray-900 opacity-50 fixed inset-0 z-10 lg:hidden"
  ></div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

/** constant */
import { modules } from "@/constants/nav";
import tree from "@/constants/_tree";

/** components */
import Scrollbar from "@/widgets/scrollbar";

/** helper */
import { split, invertObj } from "ramda";

export default {
  name: "TheAside",
  props: {
    leftnav: Boolean,
  },
  emits: ["update:leftnav"],
  components: {
    Scrollbar,
  },
  setup(props, { emit }) {
    const store = useStore();
    const hoverFlag = ref(false);
    const isOpen = computed(
      () => props.leftnav || (!props.leftnav && hoverFlag.value)
    );
    const closeNav = () => {
      emit("update:leftnav", false);
    };
    const onMouseEnter = () => {
      hoverFlag.value = true;
    };
    const onMouseLeave = () => {
      hoverFlag.value = false;
    };

    const currentNavs = computed(() => {
      const [, cate] = split("/", store.state.route.path);
      return tree[invertObj(modules)[cate]].children ?? [];
    });

    return {
      isOpen,
      closeNav,
      onMouseEnter,
      onMouseLeave,
      currentNavs,
    };
  },
};
</script>
