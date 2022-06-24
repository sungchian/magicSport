import { createI18n } from "@arshown/vue3-i18n";
import messages from "./_app/locales";

const i18n = createI18n({
  initLocale: process.env.VUE_APP_LOCALE,
  fallbackLocale: "zh-tw",
  messages,
});

export default i18n;
