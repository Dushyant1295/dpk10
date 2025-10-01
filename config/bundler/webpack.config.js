const path = require("path");

const in_path = "./src/js/";
const out_path = "../../dist/";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: `${in_path}index.js`,

  output: {
    path: path.resolve(__dirname, out_path),
    filename: "bundle.js",
  },
  devtool: 'cheap-source-map',

  watch: true,

  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  plugins: [new MiniCssExtractPlugin({
    filename: "style.css",
  })],

  
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      },
      

      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
