import { createRouter, createWebHashHistory } from "vue-router";
import createRoutes from "./_app/routes";
// import store from "./store";
// import { path } from "ramda";

const options = {
  defaultPath: "/main/dashboard",
};
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: createRoutes(options),
});

router.beforeResolve(async (to, from, next) => {
  /* 分頁切換 */
  if (to.path === from.path) {
    next();
    return false;
  }

  /** 404 */
  if (to.name === "not-found") {
    next();
    return false;
  }

  // const { needAuth = true } = path(["matched", 0, "components", "default"], to);

  /* 要身份驗證的頁面 */
  // if (needAuth) {
  //   /* 更新個人資訊 */
  //   // 每頁請求的原因：
  //   // 確認使用者 token 還活著
  //   // 確認使用者沒有被踢掉或被 ban 掉
  //   await store.dispatch("auth/read/profile");
  //   /* 沒有登入就導向登入頁 */
  //   // if (!storage.get("token")) {
  //   //   next({ name: "/login" });
  //   //   return false;
  //   // }
  // } else {
  //   next();
  // }
  next();
});

export default router;
