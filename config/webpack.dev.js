const path = require("path");
const webpack = require("webpack");

const in_path = "../src/js/";
const out_path = "../dist/";

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, `${in_path}index.js`),

  output: {
    path: path.resolve(__dirname, out_path),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },

  devtool: false,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
       use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  // Optimized dev server configuration for fast HMR
  devServer: {
    hot: false,
    liveReload: true, // Enable live reload for template changes
    port: 8080,
    host: 'localhost',
    allowedHosts: 'all',
    compress: true,
    devMiddleware: {
      writeToDisk: true, // Write files to disk for WordPress to read
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'info', // More verbose for debugging
      webSocketURL: 'ws://localhost:8080/ws', // Explicit WebSocket URL
    },
    static: {
      directory: path.resolve(__dirname, out_path),
      publicPath: '/',
    },
    watchFiles: [
      {
        paths: [
          path.resolve(__dirname, '../templates/**/*.twig'),
          path.resolve(__dirname, '../**/*.php'),
          path.resolve(__dirname, '../src/**/*.js')
        ],
        options: {
          usePolling: true, // Better for Windows
          interval: 1000, // Check every second
          ignored: /node_modules/,
        },
      }
    ],
  },

  // Performance optimizations
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  // Faster rebuilds
  cache: {
    type: 'memory',
  },

  // Reduce bundle size in dev
  resolve: {
    symlinks: false,
  },
};
