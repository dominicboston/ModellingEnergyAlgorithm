import { zeroArrayTemplate } from '../functions'
import calculateAverageGeneration from './calculateAverageGeneration'

let calcOptions = {
  season: 1,
  dayOfTheSeason: 2,
  noOfTechs: 3,
  noOfTimeSlots: 4,
  noOfDayTypes: 4
}

let averageGenPerDay = zeroArrayTemplate(
  calcOptions.noOfTechs,
  calcOptions.noOfDayTypes
)

let genData = [
  [5, 10, 15],
  [9, 4, -4],
  [8, 5, 50]
]

test('calculateAverageGen Sum Full Day Gen / noOfTimeSlows', () => {
  expect(
    calculateAverageGeneration({
      genData,
      calcOptions,
      averageGenPerDay
    })
  ).toStrictEqual([
    [0, 10, 0, 0],
    [0, 3, 0, 0],
    [0, 21, 0, 0]
  ])
})

//FULL TEST
