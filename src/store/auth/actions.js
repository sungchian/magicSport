import axios from "@/axiosD";
import storage from "store2";
// import router from "@/router";
import { isNil } from "ramda";

const actions = {
  // async "read/captcha"() {
  //   const hash = Math.random().toString(36).substring(7);
  //   const res = await axios.get("/sys/captcha", {
  //     params: {
  //       v: hash,
  //     },
  //     headerWithAuthorization: false,
  //     requestNoEffect: true,
  //   });
  //   return res;
  // },

  // async login(_, payload) {
  //   const res = await axios.post(
  //     "/sys/login",
  //     {
  //       account: payload.username,
  //       password: payload.password,
  //       enCaptcha: payload.cacheKey,
  //       inputCaptcha: payload.captcha,
  //     },
  //     {
  //       headerWithAuthorization: false,
  //     }
  //   );
  //   if (isNil(res.error)) {
  //     storage.set("token", res.result.jwtToken);
  //     storage.set("refreshToken", res.result.refreshToken);
  //   }
  //   return res;
  // },

  // async logout({ commit }, payload) {
  //   storage.clearAll();
  //   commit("clear/user");
  //   return router.push({
  //     name: "/login",
  //     params: {
  //       type: payload?.type ?? "",
  //       status: payload?.status ?? "",
  //     },
  //   });
  // },

  // async "read/profile"({ commit }) {
  //   const res = await axios.get("/sys/login-info/get");
  //   if (res.state === 0) commit("set/user", res.result);
  //   return res.state;
  // },
  async getDeviceToken() {
    const res = await axios.post("api/Device/Register", {
      token:
        "brGSOF+FP794P0OTNA7k5XQbWo3h/TYXeDXcXv5UekjHPgK+/lWDduD/kvGW7UIHz4gQMg0yKhufeKx72cmtGGcgL7dwVFUZaUT0gMm4zlJATCiQ6MxLu8PYA1x1Ytf8m/23c+T6qOMdRUDcXjMJL7bTMpAJ8nnihu2LAAUnPVfTsQv54W5jjO3OA/3XrYFz",
    });
    if (isNil(res.error)) {
      storage.set("deviceToken", res.result.token);
    }
    return res;
  },
};

export default actions;
