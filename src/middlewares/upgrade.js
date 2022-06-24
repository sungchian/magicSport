import storage from "store2";
import store from "@/store";
import axios from "axios";

const refreshInstance = axios.create({
  baseURL: process.env.VUE_APP_REMOTE_API,
  validateStatus(status) {
    return status >= 200 && status < 404;
  },
});

refreshInstance.interceptors.response.use(
  async function (response) {
    if (response.data.state === 5002) {
      switch (response.config.url) {
        case "/sys/renewjwt": {
          const res = await refreshInstance.post(
            "/sys/renewrefresh",
            {
              token: storage.get("refreshToken"),
            },
            {
              headers: {
                Authorization: `Bearer ${storage.get("token")}`,
              },
            }
          );
          console.log("RefreshRes", res);
          if (res.data.state === 0) {
            storage.set("refreshToken", res.data.result.refreshToken, true);
          }
          return res;
        }
        case "/sys/renewrefresh":
          store.dispatch("auth/logout");
          //return Promise.reject("token 更新失敗");
          break;
      }
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const upgrade = {
  use(instance) {
    instance.interceptors.response.use(
      async function (response) {
        const data = response.data;
        if (data.state === 5002) {
          // 一般 api
          const res = await refreshInstance.post("/sys/renewjwt", {
            token: storage.get("refreshToken"),
          });
          console.log("GET NEW TOKEN:", res);
          if (res.data.state === 0) {
            storage.set("token", res.data.result.jwtToken, true);
            // store.commit("app/set/alert", {
            //   type: "success",
            //   message: "憑證更新成功",
            // });

            // 更新成功：重試
            const retryData = await instance.request(response.config);
            console.log("Retry", response.config, retryData);
            // 回傳重試結果
            return {
              ...response,
              data: retryData,
            };
          }
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  },
};

export default upgrade;
