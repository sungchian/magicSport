import { mergeDeepRight } from "ramda";

const mutations = {
  "set/user"(state, data) {
    state.user = mergeDeepRight(state.user, data);
  },
  "clear/user"(state) {
    state.user = {};
  },
};

export default mutations;
