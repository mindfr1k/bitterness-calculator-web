const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const { calculationRoutes } = require('./routes')
const { PORT } = process.env

express()
  .use(cors())
  .use(bodyParser.json())
  .use('/calculator', calculationRoutes)
  .use((_, res, __) => {
    return res.status(200).json({
      message: 'React should be served here.'
    })
  })
  .listen(PORT, err => {
    if (!err)
      console.log(`Server successfully runs on ${PORT}.`)
  })