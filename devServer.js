const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const PORT = 8888

const app = express()
const compiler = webpack(config)
const dashboard = new Dashboard()

compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(devMiddleware(compiler, {
  quiet: true,
  publicPath: config.output.publicPath
}))

app.use(hotMiddleware(compiler, {
  log: () => {}
}))

const server = app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  const address = server.address()
  console.log(`Server is listening on ${address.address}:${address.port}`)
})
