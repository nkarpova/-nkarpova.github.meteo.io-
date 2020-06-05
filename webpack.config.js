const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  plugins: [
          new Dotenv()
      ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: "empty"
},
module: {
  rules: []
}
};
