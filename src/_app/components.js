const files = require.context("../components", true, /\.vue$/);
const { getFilename } = require("./_rename");
const modules = [];

files.keys().forEach((key) => {
  const filename = getFilename(key, "vue");
  modules.push({
    componentName: filename,
    component: files(key).default,
  });
});

const components = {
  install: (app) => {
    modules.forEach((m) => {
      app.component(m.componentName, m.component);
    });
  },
};

export default components;
