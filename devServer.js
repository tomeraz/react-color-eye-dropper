const express = require('express')
const testServer = require('./server')

const PORT = 8888

const app = express()


testServer.configure(app)


const server = app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  const address = server.address()
  console.log(`Server is listening on ${address.address}:${address.port}`)
})
