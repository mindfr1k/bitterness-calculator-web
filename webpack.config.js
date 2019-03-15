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
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.ttf$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  plugins: [
    new HTMLPlugin({ 
      template: join(__dirname, 'frontend', 'index.html') 
    })
  ]
}