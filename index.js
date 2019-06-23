const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { join } = require('path')

const { calculationRoutes } = require('./routes')
require('dotenv').config()

express()
  //.use(cors())
  .disable('x-powered-by')
  .use(bodyParser.json())
  .use(express.static(join(__dirname, 'frontend', 'built')))
  .use('/calculator', calculationRoutes)
  .use((_, res, __) => {
    res.sendFile(join(__dirname, 'frontend', 'built', 'index.html'))
  })
  .listen(process.env.PORT, err => {
    if (!err)
      console.log(`Server successfully runs on ${process.env.PORT}.\n`)
  })