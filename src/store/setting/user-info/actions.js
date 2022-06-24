import axios from "@/axios";
import store from "@/store";

const actions = {
  async "get/info"() {
    const ID = store.state.auth.user.managerId;
    const res = await axios.get(`/manager/first?id=${ID}`);
    return res;
  },
  async "edit/info"(_, payload) {
    const res = await axios.post("manager/update-self", payload);
    const user = {
      username: res.result.username,
      managerId: res.result.id,
      memberId: res.result.memberRosterId,
    };
    store.commit("auth/set/user", user);
    return res;
  },
  async update(_, payload) {
    const res = await axios.post("/manager/update", payload);
    return res;
  },
};

export default actions;
