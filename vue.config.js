const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Community Impact Dashboard";
      args[0].GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY;
      return args;
    });
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
      },
    },
  },
};
