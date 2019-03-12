const densityCoefficientsData = [
  {
    brewingTime: 5,
    '1.030': 0.055,
    '1.040': 0.05,
    '1.050': 0.046,
    '1.060': 0.042,
    '1.070': 0.038
  },
  {
    brewingTime: 10,
    '1.030': 0.1,
    '1.040': 0.091,
    '1.050': 0.084,
    '1.060': 0.076,
    '1.070': 0.07
  },
  {
    brewingTime: 15,
    '1.030': 0.137,
    '1.040': 0.125,
    '1.050': 0.114,
    '1.060': 0.105,
    '1.070': 0.096
  },
  {
    brewingTime: 20,
    '1.030': 0.167,
    '1.040': 0.153,
    '1.050': 0.14,
    '1.060': 0.128,
    '1.070': 0.117
  },
  {
    brewingTime: 30,
    '1.030': 0.212,
    '1.040': 0.194,
    '1.050': 0.177,
    '1.060': 0.162,
    '1.070': 0.148
  },
  {
    brewingTime: 40,
    '1.030': 0.242,
    '1.040': 0.221,
    '1.050': 0.202,
    '1.060': 0.185,
    '1.070': 0.169
  },
  {
    brewingTime: 60,
    '1.030': 0.276,
    '1.040': 0.252,
    '1.050': 0.231,
    '1.060': 0.211,
    '1.070': 0.193
  },
  {
    brewingTime: 80,
    '1.030': 0.291,
    '1.040': 0.266,
    '1.050': 0.243,
    '1.060': 0.222,
    '1.070': 0.203
  },
  {
    brewingTime: 90,
    '1.030': 0.295,
    '1.040': 0.27,
    '1.050': 0.247,
    '1.060': 0.226,
    '1.070': 0.206
  },
  {
    brewingTime: 120,
    '1.030': 0.301,
    '1.040': 0.275,
    '1.050': 0.252,
    '1.060': 0.23,
    '1.070': 0.21
  },
]

module.exports = {
  calculateDensity (density) {
    return (density * 4 + 1000) / 1000
  },
  reduceCoefficientsByDensity (density) {
    density = Math.round(density * 100) / 100
    const coefficients = []
    densityCoefficientsData.forEach(coeff => {
      switch (true) {
        case density < 1.030:
          coefficients.push({
            brewingTime: coeff.brewingTime,
            density: coeff['1.030']
          })
          break
        case density > 1.070:
          coefficients.push({
            brewingTime: coeff.brewingTime,
            density: coeff['1.070']
          })
          break
        default:
          for (let prop in coeff) {
            if (prop.includes(density)) {
              coefficients.push({
                brewingTime: coeff.brewingTime,
                density: coeff[prop]
              })
            }
          }
          break
      }
    })
    return coefficients
  },
  findCoeffByBrewingTime (coefficients, brewingTime) {
    brewingTime = parseInt(brewingTime)
    const result = {
      value: null,
      diff: 10000
    }
    for (let coeff of coefficients) {
      const diff = Math.abs(brewingTime - coeff.brewingTime)
      switch (true) {
        case diff === 0: 
          return coeff.density
        case diff < result.diff:
          result.value = coeff.density
          result.diff = diff
      }
    }
    return result.value
  }
}