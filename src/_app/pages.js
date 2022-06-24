const path = require("path");
const { getFilename } = require("./_rename");
const files = require.context("../pages", true, /\.vue$/);

const modules = [];
files.keys().forEach((key) => {
  const name = getFilename(key, "vue");
  let currentPath = "/" + name;
  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");
  /* /_id => /:id */
  currentPath = currentPath.replace(/\/_+/g, "/:");

  modules.push({
    path: currentPath,
    name: currentPath,
    meta: { layout: files(key).default.layout || "layout-default" },
    component: () => import(`@/pages/${path.normalize(key)}`),
  });
});
export default modules;
