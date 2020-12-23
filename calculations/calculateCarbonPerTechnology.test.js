import calculateCarbonPerTechnology from './calculateCarbonPerTechnology'
let calcOptions = { noOfTechs: 4 }
let annualConst = {
  annualTechCarbon: [0, 0, 0, 0],
  annualTechGen: [5, 10, 23, 2]
}
let technologyData = [
  { emissions: 12 },
  {
    emissions: 4
  },
  {
    emissions: 8
  },
  {
    emissions: 10
  }
]

test('calculateCarbonPerTechnology', () => {
  expect(
    calculateCarbonPerTechnology({
      annualConst,
      technologyData,
      calcOptions
    })
  ).toStrictEqual([60, 40, 184, 20])
})

//FULL TEST
