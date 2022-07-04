import storage from "store2";

const api = {
  use(instance) {
    instance.interceptors.request.use(
      function (config) {
        /** 需不需要身份驗證 */
        const { headerWithAuthorization = false } = config;

        /** 需要 */
        if (headerWithAuthorization) {
          /** token 過期或不存在 */
          const accessToken = storage.get("token");
          if (accessToken) {
            /** 寫入 header Authorization */
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } else {
          const accessToken = storage.get("deviceToken");
          if (accessToken) {
            /** 寫入 header Authorization */
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  },
};

export default api;
