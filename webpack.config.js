const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({template: './src/index.html', title: 'todo'})],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
     {
       test: /\.(png|svg|jpg|jpeg|gif)$/i,
       type: 'asset/resource',
     },
    ],
  },
};

// const path = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, "dist"),
//   },
//   plugins: [new HtmlWebpackPlugin({template: './src/template.html', title: 'weather application'})],
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//       },
//     ],
//   },
// };
 