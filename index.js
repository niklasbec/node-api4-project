const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

require("dotenv").config();

const port = process.env.PORT || 4000

const server = express()

server.use(express.static('client/build'))
server.use(helmet())
server.use(cors())
server.use(express.json())

const postRouter = require('./posts/posts-router')

server.use('/api/posts', postRouter)

server.listen(port, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });

server.use('*', (req, res) =>
res.status(404).json({
  status: 404,
  message: 'No endpoint matches that URL.'
}))