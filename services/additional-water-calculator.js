const additionalWaterData = {
  initTemperature: 20,
  degreeStep: 3,
  degreeDiffPerStep: 0.2,
  initBrewingTime: 60,
  initBrewingCoeff: 1.5,
  brewingStep: 10,
  brewingDiffPerStep: 0.25
}

module.exports = {
  calculateTrueInitDensity (wortTemperature, boilDensity) {
    wortTemperature = parseInt(wortTemperature)
    const { initTemperature, degreeStep, degreeDiffPerStep } = additionalWaterData
    const diff = Math.floor((wortTemperature - initTemperature) / degreeStep)
    if (diff === 0)
      return boilDensity / 100
    boilDensity -= degreeDiffPerStep * diff
    return boilDensity / 100
  },
  calculateTruePlannedDensity (brewingTime, plannedDensity) {
    brewingTime = parseInt(brewingTime)
    const { initBrewingCoeff, brewingStep, initBrewingTime, brewingDiffPerStep } = additionalWaterData
    const diff = Math.floor((brewingTime - initBrewingTime) / brewingStep)
    if (diff === 0)
      return (plannedDensity - initBrewingCoeff) / 100
    const currentBrewingCoeff = initBrewingCoeff + brewingDiffPerStep * diff
    return (plannedDensity - currentBrewingCoeff) / 100
  }
}