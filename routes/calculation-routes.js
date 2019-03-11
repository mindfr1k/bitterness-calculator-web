const { Router } = require('express')

module.exports = Router()
  .get('/beer-bitterness', (_, res, __) => {
    return res.status(200).json({
      message: 'Bitterness calculation.'
    })
  })
  .get('/additional-water', (_, res, __) => {
    return res.status(200).json({
      message: 'Water calculation.'
    })
  })