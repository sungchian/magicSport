const path = require("path");

/**
 * 將一串文字轉換成字首大寫
 * @param {string} str
 */
const headToUpperCase = (str) => {
  const head = str.substring(0, 1);
  const tail = str.substring(1);
  return head.toUpperCase() + tail.toLowerCase();
};

/**
 * kebab-case -> PascalCase
 */
const kebabToPascal = (kebabStr) =>
  kebabStr.split("-").map(headToUpperCase).join("");

/**
 * kebab-case -> camelCase
 */
const kebabToCamel = (kebabStr) => {
  const [head, ...tail] = kebabStr.split("-");
  return [head, ...tail.map(headToUpperCase)].join("");
};

/**
 *
 * @param {string} filePath
 * @param {string} ext
 *
 * ./path/to/my-file.ext
 * ->
 * my-file
 */
const getFilename = (filePath, ext) => {
  return path.normalize(filePath).toLowerCase().replace(`.${ext}`, "");
};

export { headToUpperCase, kebabToPascal, kebabToCamel, getFilename };
