import { append, reject, equals, remove, findIndex } from "ramda";

const mutations = {
  "add/apiQueue"(state, apiDesc) {
    state.apiQueue = append(apiDesc, state.apiQueue);
  },
  "remove/apiQueue"(state, apiDesc) {
    state.apiQueue = reject(equals(apiDesc), state.apiQueue);
  },
  "removeBefore/apiQueue"(state, apiDesc) {
    console.log("2", state.apiQueue);
    if (findIndex(equals(apiDesc)(apiDesc)) === -1 || 0) return;
    else {
      state.apiQueue = remove(
        findIndex(equals(apiDesc)(state.apiQueue)) - 1,
        1,
        state.apiQueue
      );
    }
  },
  // "set/breadcrumb"(state, list) {
  //   state.breadcrumb = list;
  // },
  // "clear/breadcrumb"(state) {
  //   state.breadcrumb = [];
  // },
  "set/alert"(state, payload) {
    state.alert = {
      type: payload.type,
      message: payload.message,
      timestamp: Date.now(),
    };
  },
  "reset/alert"(state) {
    state.alert = {
      type: "default",
      message: null,
      timestamp: 0,
    };
  },
};

export default mutations;
