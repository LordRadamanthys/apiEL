const express = require('express')
const routes = require('./routes')
const path = require('path')
const app = express()
const http = require('http')
const { setupWebSocket } = require('./setupWebSocket')

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')))
const server = http.createServer(app)
setupWebSocket(server)



server.listen(3333)