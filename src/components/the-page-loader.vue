<template>
  <transition
    name="fade"
    leave-active-class="animate__animated animate__fadeOut animate__faster"
  >
    <div v-show="isNotReady" class="loader">
      <div class="loader__inner"></div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const isNotReady = ref(true);
    onMounted(() => {
      setTimeout(function () {
        isNotReady.value = false;
      }, 1000);
    });

    return {
      isNotReady,
    };
  },
};
</script>
