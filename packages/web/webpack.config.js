const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: {
      import: require.resolve("./src/main.tsx"),
      library: {
        type: "umd",
      },
    },
    index: {
      import: require.resolve("./src/index.tsx"),
      library: {
        type: "amd",
      },
    },
  },
  devtool: "source-map",
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    //path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/assets/index.html",
      chunks: ["main"],
    }),
  ],
};
