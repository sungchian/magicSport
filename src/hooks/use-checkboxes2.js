import { reactive, watch } from "vue";
// import { pick } from "ramda";

export const attrs = {
  unChecked: 0,
  checked: 1,
  indeterminate: 2,
};

const useCheckboxes = ({ itemValues } = {}) => {
  const checkboxes = reactive({
    all: attrs.unChecked,
    items: [],
  });
  watch(
    () => checkboxes.all,
    (value) => {
      let allPick = [];
      // itemValues.value.forEach((value) => console.log(value));
      // itemValues.value.forEach((value) => allPick.push({ id: value }));
      itemValues.value.forEach((value) => allPick.push(value));
      switch (value) {
        case 0:
          if (checkboxes.items.length !== 0) checkboxes.items = [];
          break;
        case 1:
          if (checkboxes.items.length < itemValues.value.length)
            // checkboxes.items = itemValues.value;
            checkboxes.items = allPick;
          break;
      }
    }
  );

  watch(
    () => checkboxes.items,
    (values) => {
      if (values.length === 0) {
        if (checkboxes.all !== attrs.unChecked)
          checkboxes.all = attrs.unChecked;
      } else if (values.length === itemValues.value.length) {
        if (checkboxes.all !== attrs.checked) checkboxes.all = attrs.checked;
      } else {
        if (checkboxes.all !== attrs.indeterminate)
          checkboxes.all = attrs.indeterminate;
      }
    }
  );

  const reset = () => {
    checkboxes.all = attrs.unChecked;
  };

  return [checkboxes, reset];
};

export default useCheckboxes;
