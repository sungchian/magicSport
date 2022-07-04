/* https://www.kancloud.cn/yunye/axios/234845 */
import axios from "axios";
import logger from "@/middlewares/logger";
import api from "@/middlewares/api";
import upgrade from "@/middlewares/upgrade";
import validate from "@/middlewares/validate";
import transfer from "@/middlewares/transfer";
import requestQueue from "./middlewares/request-queue";
import requestDuplicate from "@/middlewares/request-duplicate";

const instance = axios.create();

instance.defaults.baseURL = process.env.VUE_APP_REMOTE_API2;
//下列不需要了
// instance.defaults.transformResponse = (data) => {
//   try {
//     return JSONbig.parse(data);
//   } catch (err) {
//     return { data };
//   }
// };
/* 識別請求來源相同 */
// instance.defaults.withCredentials = true;

/* 配置选项定义一个自定义 HTTP 状态码的错误范围 */
instance.defaults.validateStatus = (status) => {
  return status >= 200 && status < 404; // 默认的
};
/* csrf */
// instance.defaults.xsrfCookieName = 'XSRF-TOKEN';
// instance.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

/* 逾時 ： 10 秒 */
// instance.defaults.timeout = 10000;

/** middleware */
// if (process.env.NODE_ENV === "development") {
//   logger.use(instance);
// }

logger.use(instance);
upgrade.use(instance);
requestDuplicate.use(instance);
requestQueue.use(instance);
api.use(instance);
validate.use(instance);
transfer.use(instance);

export default instance;
