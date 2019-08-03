const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const env = process.env.NODE_ENV;
const distDir = "public";

const config = {

  "mode": env,

  "entry": {
    "main": path.resolve(__dirname, "src/main/main.ts"),
  },

  "output": {
    "path": path.join(__dirname, distDir),
    "filename": "[name].bundle.js",
    "libraryTarget": "this",
  },

  "optimization": {
    "minimizer": [
      new TerserPlugin({
        "terserOptions": {
          "output": {
            "comments": false,
          },
        },
      }),
    ],
  },

  "resolve": {
    "extensions": [".ts", ".js"],
    "modules": [
      path.join(__dirname, "src/main"),
      "node_modules",
    ],
  },

  "plugins": [
    new CleanWebpackPlugin({
      "verbose": true,
    }),
    new HtmlWebpackPlugin({
      "template": "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(env),
      },
      "WEBGL_RENDERER": JSON.stringify(true),
      "CANVAS_RENDERER": JSON.stringify(true),
    }),
  ],

  "module": {
    "rules": [
      {
        "test": /\.ts$/,
        "use": ["ts-loader"],
        "exclude": /node_modules/,
      },
      {
        "test": /\.(jpg|png|mp4|ico)$/,
        "use": "file-loader?name=[name].[ext]",
      },
      {
        "test": [/\.vert$/, /\.frag$/],
        "use": "raw-loader",
      },
    ],
  },

  "devServer": {
    "port": 8080,
    "proxy": {
      "/api": {
        "target": "https://staging-ct.pyxis-social.com",
        "secure": false,
        "changeOrigin": true,
      },
    },
  },
};

if (env === "production") {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.plugins.push(new webpack.LoaderOptionsPlugin({"minimize": true}));
  config.devtool = false;
  config.performance = {
    "maxEntrypointSize": 900000,
    "maxAssetSize": 900000,
  };
} else {
  config.optimization = {
    "namedModules": true,
  };
  config.devtool = "eval-source-map";
  config.externals = {};
}

module.exports = config;
