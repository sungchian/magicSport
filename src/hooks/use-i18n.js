import { ref } from "vue";
import { useI18n } from "@arshown/vue3-i18n";
import { split, join } from "ramda";

const useI18nExtends = () => {
  const i18n = useI18n();
  const prefix = ref({});
  const setPrefix = (str) => {
    if (typeof str === "string") {
      prefix.value = { $current: str };
    } else {
      prefix.value = { ...prefix.value, ...str };
    }
  };

  const transfer = (str, params = {}) => {
    const [PREFIX, ...words] = split(".", str);
    if (PREFIX in prefix.value) {
      return transfer(`${prefix.value[PREFIX]}.${join(".", words)}`, params);
    } else return i18n.t(str, params);
  };

  return {
    locale: i18n.locale,
    change: i18n.setLocale,
    setPrefix,
    t: transfer,
    addMessages: i18n.addMessages,
  };
};

export default useI18nExtends;
