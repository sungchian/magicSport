const R = require("ramda");
const { getFilename } = require("./_rename");
const files = require.context("../locales", true, /\.js$/);
const messages = {};

files.keys().forEach((key) => {
  const pathToFile = getFilename(key, "js");
  const [locale, ...paths] = pathToFile.split("/");
  const messageKey = R.join(".", paths);
  const fileObj = files(key).default;
  messages[locale] = R.reduce(
    (merge, key) =>
      R.mergeDeepRight(merge, {
        [`${messageKey}.${key}`]: fileObj[key],
      }),
    messages[locale] || {},
    R.keys(fileObj)
  );
});

export default messages;
