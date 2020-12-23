import calculateAnnualGeneration from './calculateAnnualGeneration'

let calcOptions = {
  noOfTechs: 4,
  noOfDayTypes: 4,
  dayYearPercent: [0.2, 0.5, 0.8, 0.5]
}
let annualConst = {
  annualDemand: 0,
  averageDemandPerDay: [30, 20, 30, 30],
  annualTechGen: [32, 34, 24, 38]
}
let averageGenPerDay = [
  [6, 7, 6, 5],
  [2, 3, 2, 3],
  [4, 4, 6, 5],
  [2, 4, 8, 5]
]

test('Calculate Annual Generation', () => {
  expect(
    calculateAnnualGeneration({
      calcOptions,
      annualConst,
      averageGenPerDay
    })
  ).toStrictEqual([105.12, 43.8, 88.47600000000001, 98.98800000000001])
})

//Self Passed

// before simplification
// 0.034 differnce for each
