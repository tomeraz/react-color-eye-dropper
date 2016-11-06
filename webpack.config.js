const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require('autoprefixer')

const relpath = path.join.bind(path, __dirname)

const NPM_EVENT = process.env.npm_lifecycle_event
const NODE_ENV = process.env.NODE_ENV || 'development'
const isTestEnv = NODE_ENV === 'test'
const isProductionCode = NODE_ENV === 'production'
const isDevelopmentServer = NPM_EVENT === 'start'

const paths = {
  dist: relpath(`./dist/${NODE_ENV}`),
  appEntry: relpath('./src/index'),
  indexHtml: relpath('./src/index.html'),
  src: relpath('./src'),
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
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    paths.appEntry,
  ] :
  [paths.appEntry]
}

function getPlugins() {
  let plugins = [
    new CleanWebpackPlugin(paths.dist),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: `html!${paths.indexHtml}`,
      inject: true,
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css/,
      debug: true,
      options: {
        postcss: [],
        context: path.join(__dirname, 'src'),
        output: {
          path: path.join(__dirname, 'dist'),
        },
      },
    }),
  ]

  if (isDevelopmentServer) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
    ])
  }

  return plugins
}

function getModuleRules() {
  return {
    rules: [
      {
        test: /\.jsx?$/,
        include: paths.src,
        use: {
          loader: 'babel',
        },
      },
      {
        test: /\.s?css/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path]_[name]_[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.json/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
    ],
  }
}

function getStyleLoaders() {
  if (isProductionCode) {
    return ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loaders: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: true,
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
        },
      ],
    })
  } else { // !isProductionCode
    return [
      {
        loader: 'style-loader',
      },

    ]
  }
    // return isProductionCode
    // ? ExtractTextPlugin.extract('style', ['css?modules&importLoaders=1', 'postcss', 'sass'].join('!')) //
    // : ['style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]', 'postcss?sourceMap', 'sass?sourceMap'].join('!')
}

module.exports = {
  devtool: getSourceMap(),
  bail: !isDevelopmentServer,
  entry: getEntryPoints(),
  output: {
    path: paths.dist,
    filename: 'index.js',
  },
  plugins: getPlugins(),
  module: getModuleRules(),
}
