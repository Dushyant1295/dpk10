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
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "./postcss.config.js"),
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
