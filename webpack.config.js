const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/assets/js/app.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "static"),
    },
    liveReload: true,
    compress: true,
    open: true,
    hot: false,
    port: 3000,
    devMiddleware: {
      index: true,
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/g,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "> 5% in KR, defaults, not IE < 11",
                      autoprefixer: { grid: "autoplace" },
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  watchOptions: {
    ignored: ["**/node_modules"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/static", to: "static" }],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      hash: true,
      cache: false,
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
};
