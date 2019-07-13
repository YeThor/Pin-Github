const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  entry: {
    index: "./src/index.ts",
    contentScript: "./src/contentScript.ts",
    backgroundScript: "./src/backgroundScript.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: [/node_modules/]
      }
    ]
  }
};
