import calculateAnnualDemand from './calculateAnnualDemand'
let calcOptions = { noOfDayTypes: 4, dayYearPercent: [0.2, 0.5, 0.8, 0.5] }
let annualConst = {
  annualDemand: 0,
  averageDemandPerDay: [30, 20, 30, 30]
}

test('calculateAverageGen Sum Full Day Gen / noOfTimeSlows', () => {
  expect(
    calculateAnnualDemand({
      calcOptions,
      annualConst
    })
  ).toStrictEqual(481.8)
})
//Self Passed
