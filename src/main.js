import { createApp } from "vue";
import { sync } from "vuex-router-sync";
import App from "./App";
import plugins from "@/_app/plugins";
import layouts from "@/_app/layouts";
import components from "@/_app/components";
import store from "@/store";
import i18n from "@/i18n";
import router from "./router";
import "./assets/main.scss";
import "./assets/print.css";
import "@fortawesome/fontawesome-free/js/all";

const app = createApp(App);
app.use(plugins);
app.use(layouts);
app.use(components);
app.use(store);
app.use(router);
app.use(i18n);
sync(store, router);
app.mount("#app");
