const files = require.context("../layouts", true, /\.vue$/);
const { getFilename } = require("./_rename");
const modules = [];

files.keys().forEach((key) => {
  const filename = getFilename(key, "vue");
  modules.push({
    componentName: filename,
    component: files(key).default,
  });
});

const layouts = {
  install: (app) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  },
};

export default layouts;
