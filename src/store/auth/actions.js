import axios from "@/axios";
import storage from "store2";
import router from "@/router";
import { isNil } from "ramda";

const actions = {
  async "read/captcha"() {
    const hash = Math.random().toString(36).substring(7);
    const res = await axios.get("/sys/captcha", {
      params: {
        v: hash,
      },
      headerWithAuthorization: false,
      requestNoEffect: true,
    });
    return res;
  },

  async login(_, payload) {
    const res = await axios.post(
      "/sys/login",
      {
        account: payload.username,
        password: payload.password,
        enCaptcha: payload.cacheKey,
        inputCaptcha: payload.captcha,
      },
      {
        headerWithAuthorization: false,
      }
    );
    if (isNil(res.error)) {
      storage.set("token", res.result.jwtToken);
      storage.set("refreshToken", res.result.refreshToken);
    }
    return res;
  },

  async logout({ commit }, payload) {
    storage.clearAll();
    commit("clear/user");
    return router.push({
      name: "/login",
      params: {
        type: payload?.type ?? "",
        status: payload?.status ?? "",
      },
    });
  },

  async "read/profile"({ commit }) {
    const res = await axios.get("/sys/login-info/get");
    if (res.state === 0) commit("set/user", res.result);
    return res.state;
  },
};

export default actions;
