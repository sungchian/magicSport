<template>
  <teleport to="body">
    <transition
      name="fade"
      enter-active-class="animate__animated animate__fadeInDown animate__faster"
      leave-active-class="animate__animated animate__slideOutUp animate__faster"
    >
      <div
        v-if="alert.message"
        class="fixed top-0 z-50 w-min right-0 p-5 opacity-95 shadow-lg cursor-pointer text-center font-medium"
        :class="alert.classes"
        @click="onClose"
      >
        {{ alert.message }}
      </div>
    </transition>
  </teleport>
</template>

<script>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "Alert",
  setup() {
    const store = useStore();
    let timer = null;
    const alert = reactive({
      classes: computed(() => {
        const type = store.state.app.alert.type;
        switch (type) {
          case "info":
            return "text-blue-700 bg-blue-100";
          case "danger":
            return "text-red-700 bg-red-100";
          case "success":
            return "text-green-700 bg-green-100";
          case "warning":
            return "text-yellow-700 bg-yellow-100";
          default:
            return "text-gray-700 bg-gray-100";
        }
      }),
      message: computed(() => {
        const message = store.state.app.alert.message;
        if (typeof message === "function") return message();
        return message;
      }),
    });
    const onClose = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      store.commit("app/reset/alert");
    };
    watch(
      () => store.state.app.alert.timestamp,
      () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(() => {
          onClose();
        }, 7000);
      }
    );
    return {
      alert,
      onClose,
    };
  },
};
</script>
