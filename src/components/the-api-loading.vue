<template>
  <transition
    name="fade"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div v-show="hasLoadingAPIs" class="api-loading">
      <div class="api-loading__wave"></div>
      <div class="api-loading__wave"></div>
      <div class="api-loading__wave"></div>
      <div class="api-loading__wave"></div>
      <div class="api-loading__wave"></div>
      <div class="api-loading__wave"></div>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const hasLoadingAPIs = computed(() => store.state.app.apiQueue.length > 0);
    return {
      hasLoadingAPIs,
    };
  },
};
</script>
