import store from "@/store";

const requestQueue = {
  use(instance) {
    instance.interceptors.request.use(
      function (config) {
        const { requestNoEffect = false } = config;
        if (!requestNoEffect) {
          /* 存入請求佇列 */
          const requestId = `request--${Math.random()
            .toString(36)
            .substring(7)}`;
          config.requestId = requestId;
          console.log("[add]", config.url, requestId);
          store.commit("app/add/apiQueue", requestId);
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      async function (response) {
        const { requestNoEffect = false } = response.config;
        if (!requestNoEffect) {
          console.log(
            "[remove]",
            response.config.url,
            response.config.requestId
          );
          store.commit("app/remove/apiQueue", response.config.requestId);
        }
        return response;
      },
      function (error) {
        if (error && error.response) {
          const { requestNoEffect = false } = error.response.config;
          if (!requestNoEffect) {
            console.log(
              "[remove]",
              error.response.config.url,
              error.response.config.requestId
            );
            store.commit(
              "app/remove/apiQueue",
              error?.response?.config?.requestId
            );
          }
        }

        return Promise.reject(error);
      }
    );
  },
};

export default requestQueue;
