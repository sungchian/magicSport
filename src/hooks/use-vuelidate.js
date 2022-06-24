import { useValidate, validators } from "@arshown/vue3-validate";

const {
  alpha,
  alphaNum,
  and,
  between,
  decimal,
  email,
  helpers,
  integer,
  ipAddress,
  macAddress,
  maxLength,
  maxValue,
  minLength,
  minValue,
  not,
  numeric,
  or,
  required,
  requiredIf,
  requiredUnless,
  sameAs,
  url,
} = validators;

/* custom validator */
export const phone = {
  $validator: helpers.regex(/^09\d{8}$/),
  $message: "Value is not a valid phone format",
};

export default useValidate;

export {
  alpha,
  alphaNum,
  and,
  between,
  decimal,
  email,
  integer,
  ipAddress,
  macAddress,
  maxLength,
  maxValue,
  minLength,
  minValue,
  not,
  numeric,
  or,
  required,
  requiredIf,
  requiredUnless,
  sameAs,
  url,
};
