<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        enter-active-class="animate__animated fadeInUpSmall animate__faster"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
  <the-page-loader />
  <the-api-loading />
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { isNil, defaultTo, path } from "ramda";

export default {
  setup() {
    // const storage = inject("$storage");
    const store = useStore();
    const key = computed(() => store.state.route.path);
    const layout = computed(() => {
      /* 一開始都是 undefined */
      if (isNil(store.state.route.path)) return null;
      /* 拿設定的 layout，預設是 default-layout */
      const currentLayout = defaultTo("layout-error")(
        path(["meta", "layout"], store.state.route)
      );
      return currentLayout;
    });

    onMounted(async () => {
      const res = await store.dispatch("auth/getDeviceToken");
      console.log(res);
      if (res.statusCode !== 200) {
        alert("GetTokenError");
      }
    });

    return {
      key,
      layout,
    };
  },
};
</script>
