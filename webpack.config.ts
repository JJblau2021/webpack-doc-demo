import * as path from "path";
import * as webpack from "webpack";
// in case you run into any typescript error when configuring `devServer`
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contenthash:8].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.png",
      title: "webpack-demo",
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        // js、jsx、ts、tsx 模块的处理
        test: /\.(t|j)sx?$/,
        // 排除 node_modules 目录下的文件
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              // sourceMaps: true,
            },
          },
        ],
      },
      {
        // less, css 模块的处理
        test: /\.(le|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  devServer: {
    open: false,
    port: 9000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};

export default config;
