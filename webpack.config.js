var path = require('path');
var webpack = require('webpack');
module.exports = {
  context: __dirname,
  output: {
   path: path.resolve(__dirname, 'dist'),
   filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    },{
      test: /\.css$/,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader"]
    }]
  },
  watch:true
}
