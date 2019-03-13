const { join } = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: join(__dirname, 'frontend', 'index.js'),
  output: {
    path: join(__dirname, 'frontend', 'built'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        include: join(__dirname, 'frontend'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HTMLPlugin({ template: join(__dirname, 'frontend', 'index.html') })
  ]
}