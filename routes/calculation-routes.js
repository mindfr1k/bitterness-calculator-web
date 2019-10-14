const { Router } = require('express')

const {calculateDensity, findCoeffByBrewingTime,
  reduceCoefficientsByDensity } = require('../services/bitterness-calculator')
const {calculateTrueInitDensity,
  calculateTruePlannedDensity } = require('../services/additional-water-calculator')

module.exports = Router()
  .post('/beer-bitterness', (req, res) => {
    const { initDensity, wortVolume, hops } = req.body
    const coefficients = reduceCoefficientsByDensity(calculateDensity(initDensity))
    let totalBitterness = 0
    hops.forEach(hop => {
      const { weightInput, bitternessInput, brewingTime } = hop
      const stepValue = (weightInput * bitternessInput / wortVolume / 10 * 100).toFixed(2)
      totalBitterness += (stepValue * findCoeffByBrewingTime(coefficients, brewingTime))
    })
    totalBitterness = totalBitterness.toFixed(2)
    return res.status(200).json({
      totalBitterness
    })
  })
  .post('/additional-water', (req, res) => {
    const { wortVolume, wortTemperature, boilDensity, brewingTime, plannedDensity } = req.body
    const remainedWater = wortVolume * calculateTrueInitDensity(wortTemperature, boilDensity)
      / calculateTruePlannedDensity(brewingTime, plannedDensity)
    const additionalWater = (remainedWater - wortVolume).toFixed(2)
    return res.status(200).json({
      additionalWater
    })
  })