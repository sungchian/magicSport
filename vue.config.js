// const path = require("path");
// const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
// const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = {
  devServer: {
    // proxy: "https://armani.dev.zsmgoe.link/api/v1",
    proxy: {
      "/api": {
        target: "https://ballard.dev.zsmgoe.link/api/v1",
        // ws: true,
        // changeOrigin: true,
        pathRewrite: {
          "^/api": "", //請求的時候使用這個api就可以
        },
      },
      "/com": {
        target: "https://farrell.dev.zsmgoe.link/api/v1",
        pathRewrite: {
          "^/com": "", //請求的時候使用這個api就可以
        },
      },
    },
  },

  // // Vue CLI would normally use its own loader to load .svg and .css files, however:
  // //	1. The icons used by CKEditor must be loaded using raw-loader,
  // //	2. The CSS used by CKEditor must be transpiled using PostCSS to load properly.
  // chainWebpack: (config) => {
  //   // (1.) To handle the editor icons, get the default rule for *.svg files first:
  //   const svgRule = config.module.rule("svg");

  //   // Then you can either:
  //   //
  //   // * clear all loaders for existing 'svg' rule:
  //   //
  //   //		svgRule.uses.clear();
  //   //
  //   // * or exclude ckeditor directory from node_modules:
  //   svgRule.exclude.add(path.join(__dirname, "node_modules", "@ckeditor"));

  //   // Add an entry for *.svg files belonging to CKEditor. You can either:
  //   //
  //   // * modify the existing 'svg' rule:
  //   //
  //   //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
  //   //
  //   // * or add a new one:
  //   config.module
  //     .rule("cke-svg")
  //     .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
  //     .use("raw-loader")
  //     .loader("raw-loader");

  //   // (2.) Transpile the .css files imported by the editor using PostCSS.
  //   // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
  //   config.module
  //     .rule("cke-css")
  //     .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
  //     .use("postcss-loader")
  //     .loader("postcss-loader")
  //     .tap(() => {
  //       return {
  //         postcssOptions: styles.getPostCssConfig({
  //           themeImporter: {
  //             themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
  //           },
  //           minify: true,
  //         }),
  //       };
  //     });
  // },

  runtimeCompiler: true,
  productionSourceMap: false,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  publicPath: process.env.BASE_URL,
};
