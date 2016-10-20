const express = require('express')


module.exports.configure = function(app){
  app.get('/', function(req, res){
    res.send('tomer')
  })
}
