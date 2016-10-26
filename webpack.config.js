const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const relpath = path.join.bind(path, __dirname)

const NPM_EVENT = process.env.npm_lifecycle_event
const NODE_ENV = process.env.NODE_ENV || 'development'
const isTestEnv = NODE_ENV === 'test'
const isDevelopmentServer = NPM_EVENT === 'start'

const paths = {
  dist: relpath(`./dist/${NODE_ENV}`),
  appEntry: relpath('./src/index'),
  indexHtml: relpath('./src/index.html'),
  src: relpath('./src')
}

function getSourceMap() {
  // TestEnv source-maps:
  // cheap-module-source-map - fastest that works in the console
  // inline-source-map - works in chrome (for debugging)
  return isTestEnv ? 'inline-source-map' :
    isDevelopmentServer ? 'eval-source-map' :
    'source-map'
}

function getEntryPoints() {
  return isDevelopmentServer ?
  [
    'webpack-hot-middleware/client',
    paths.appEntry
  ] :
  [paths.appEntry]
}

function getPlugins() {
  let plugins = [
    new CleanWebpackPlugin(paths.dist),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'html!' + paths.indexHtml,
      inject: true
    })
  ]

  if (isDevelopmentServer) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  }

  return plugins
}

module.exports ={
  devtool: getSourceMap(),
  bail: !isDevelopmentServer,
  entry: getEntryPoints(),
  output: {
    path: paths.dist,
    filename: 'index.js'
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: paths.src
      }
    ]
  }
}
