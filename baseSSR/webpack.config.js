const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"]
  },
  module: {
    rules: [
      {
          test: /\.ts(x?)$/,
          exclude: ['/node_modules'],
          use: [
              {
                  loader: "ts-loader"
              }
          ]
      },
      {
          enforce: "pre",
          test: /\.js$/,
          exclude: ['/node_modules'],
          loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
  ],
  mode: 'production',
};