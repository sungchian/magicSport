<template>
  <nav class="flex">
    <ol class="inline-flex items-center space-x-1">
      <li v-for="(node, idx) in breadcrumb" :key="`breadcrumb--${node}`">
        <div class="flex items-center">
          <svg
            v-if="idx === 0"
            class="w-5 h-5 mr-2.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            ></path>
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-gray-400 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <a
            class="text-sm font-medium"
            :class="{
              'text-gray-400': idx === breadcrumb.length - 1,
              'text-gray-700': idx !== breadcrumb.length - 1,
            }"
            >{{ t(`node.${node}`) }}</a
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import useI18n from "@/hooks/use-i18n";

export default {
  name: "TheBreadcrumb",
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const breadcrumb = computed(() => store.state.app.breadcrumb);
    return {
      t,
      breadcrumb,
    };
  },
};
</script>
