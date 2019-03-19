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
      return parseInt(boilDensity)
    for (let i = 0; i < diff; i++) {
      boilDensity -= degreeDiffPerStep
    }
    return boilDensity
  },
  calculateTruePlannedDensity (brewingTime, plannedDensity) {
    brewingTime = parseInt(brewingTime)
    const { initBrewingCoeff, brewingStep, initBrewingTime, brewingDiffPerStep } = additionalWaterData
    const diff = Math.floor((brewingTime - initBrewingTime) / brewingStep)
    if (diff === 0)
      return plannedDensity - initBrewingCoeff
    let currentBrewingCoeff = initBrewingCoeff
    for (let i = 0; i < diff; i++) {
      currentBrewingCoeff += brewingDiffPerStep
    }
    return plannedDensity - currentBrewingCoeff
  }
}