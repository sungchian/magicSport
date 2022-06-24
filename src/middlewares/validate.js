import store from "@/store";

const validate = {
  use(instance) {
    instance.interceptors.response.use(
      async function (response) {
        /** jwt 錯誤 */
        switch (response.data.state) {
          case 201001:
          case 5006:
          case 9000:
            await store.dispatch("auth/logout", {
              type: "danger",
              status: response.data.code,
            });
            break;
          case 5003:
            await store.dispatch("auth/logout", {
              type: "danger",
              status: response.data.code,
            });
            break;
          default:
            break;
        }
        return response.data;
      },
      function (error) {
        console.log(error);
        if (!error.selfCancel) {
          if (error && error.response) {
            return error.response.data;
          } else {
            console.error("API RESPONSE ERROR");
            store.dispatch("auth/logout");
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  },
};

export default validate;
