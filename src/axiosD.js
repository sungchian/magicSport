import axios from "axios";
import logger from "@/middlewares/logger";
import api from "@/middlewares/api";
import validate from "@/middlewares/validate";
import transfer from "@/middlewares/transfer";
import requestQueue from "./middlewares/request-queue";

const instance = axios.create();

instance.defaults.baseURL = process.env.VUE_APP_REMOTE_API;
/* 識別請求來源相同 */
// instance.defaults.withCredentials = true;

/* 配置选项定义一个自定义 HTTP 状态码的错误范围 */
instance.defaults.validateStatus = (status) => {
  return status >= 200 && status < 404; // 默认的
};

logger.use(instance);
requestQueue.use(instance);
api.use(instance);
validate.use(instance);
transfer.use(instance);

export default instance;
