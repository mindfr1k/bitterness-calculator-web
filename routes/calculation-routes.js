const { Router } = require('express')

const {calculateDensity, findCoeffByBrewingTime,
  reduceCoefficientsByDensity } = require('../services/bitterness-calculator')
const {calculateTrueInitDensity,
  calculateTruePlannedDensity } = require('../services/additional-water-calculator')

module.exports = Router()
  .post('/beer-bitterness', (req, res, __) => {
    const { initDensity, wortVolume, hops } = req.body
    const coefficients = reduceCoefficientsByDensity(calculateDensity(initDensity))
    let totalBitterness = 0
    hops.forEach(hop => {
      const { weightInput, bitternessInput, brewingTime } = hop
      const stepValue = (weightInput * bitternessInput / Math.floor(wortVolume / 10)).toFixed(2)
      totalBitterness += (stepValue * findCoeffByBrewingTime(coefficients, brewingTime))
    })
    totalBitterness = totalBitterness.toFixed(2)
    return res.status(200).json({
      totalBitterness
    })
  })
  .get('/additional-water', (_, res, __) => {
    return res.status(200).json({
      message: 'Water calculation.'
    })
  })