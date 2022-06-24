import storage from "store2";

const auth = {
  use(instance) {
    instance.interceptors.response.use(
      function (config) {
        const { noAuth = false } = config;
        if (noAuth) return config;

        /** token 不存在 */
        const accessToken = storage.get("token");
        if (!accessToken)
          return Promise.reject({
            response: {
              config,
              data: {
                code: 99999,
              },
            },
          });

        /** 寫入 header Authorization */
        config.headers.Authorization = accessToken;

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  },
};

export default auth;
