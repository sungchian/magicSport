/**
 * doc
 * @link https://sweetalert2.github.io/
 */
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import i18n from "@/i18n";

export const ALERT_INFO = {
  icon: "info",
  showCancelButton: false,
  customClass: {
    confirmButton: "button button--primary button--md w-24",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export const ALERT_SUCCESS = {
  icon: "success",
  showCancelButton: false,
  customClass: {
    confirmButton: "button button--green button--md w-24",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export const ALERT_WARNING = {
  icon: "warning",
  showCancelButton: false,
  customClass: {
    confirmButton: "button button--yellow button--md w-24",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export const ALERT_ERROR = {
  icon: "error",
  showCancelButton: false,
  customClass: {
    confirmButton: "button button--red button--md w-24",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
  buttonsStyling: false,
};

export const CONFIRM_INFO = {
  icon: "info",
  showCancelButton: true,
  customClass: {
    confirmButton: "button button--primary button--md w-24 mx-1",
    cancelButton: "button button--light button--md w-24 mx-1",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
  buttonsStyling: false,
};

export const CONFIRM_SUCCESS = {
  icon: "success",
  showCancelButton: true,
  customClass: {
    confirmButton: "button button--green button--md w-24 mx-1",
    cancelButton: "button button--light button--md w-24 mx-1",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export const CONFIRM_WARNING = {
  icon: "warning",
  showCancelButton: true,
  customClass: {
    confirmButton: "button button--yellow button--md w-24 mx-1",
    cancelButton: "button button--light button--md w-24 mx-1",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export const CONFIRM_ERROR = {
  icon: "error",
  showCancelButton: true,
  customClass: {
    confirmButton: "button button--red button--md w-24 mx-1",
    cancelButton: "button button--light button--md w-24 mx-1",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export const CONFIRM_QUESTION_GREEN = {
  icon: "question",
  iconColor: "#0e9f6e",
  showCancelButton: true,
  customClass: {
    confirmButton: "button button--green button--md w-24 mx-1",
    cancelButton: "button button--light button--md w-24 mx-1",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export const CONFIRM_QUESTION_RED = {
  icon: "question",
  iconColor: "#e02525",
  showCancelButton: true,
  customClass: {
    confirmButton: "button button--red button--md w-24 mx-1",
    cancelButton: "button button--light button--md w-24 mx-1",
    input: "form-control text-md my-2 h-auto w-auto-important",
  },
};

export default {
  alias: "$swal",
  value: Swal.mixin({
    reverseButtons: true,
    heightAuto: false,
    focusConfirm: false,
    buttonsStyling: false,
    allowOutsideClick: false,
    allowEnterKey: false,
    allowEscapeKey: false,
    confirmButtonText: i18n.t("widgets.swal.confirm"),
    cancelButtonText: i18n.t("widgets.swal.cancel"),
    didOpen(popup) {
      const cancelBtn = popup.querySelector(".swal2-cancel");
      const confirmBtn = popup.querySelector(".swal2-confirm");
      confirmBtn.blur();
      cancelBtn.blur();
    },
  }),
};
