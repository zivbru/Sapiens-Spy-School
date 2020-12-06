const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'index.html',
    port: 3001,
    writeToDisk: true,
  },

  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: 'development',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      socketIOClient: path.join(
        __dirname,
        'node_modules',
        'socket.io-client',
        'dist',
        'socket.io.js'
      ),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index_template.html',
      favicon: 'public/favicon.ico',
    }),
  ],
};
