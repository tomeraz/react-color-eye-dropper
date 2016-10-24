const express = require('express')
var path = require('path')

module.exports.configure = function(app){
  app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, '../src/index.html'))
  })

  app.use('/scripts', express.static(path.join(__dirname, '.')));
}
