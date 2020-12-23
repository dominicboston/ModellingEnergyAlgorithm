// import { dayNumberInData } from '../functions'

export default function calculateCurtailment ({
  calcOptions,
  technologyData,
  availData,
  genData
  // averageCurtailmentPerDay
}) {
  const {
    noOfStorTypes,
    noOfTechs,
    noOfTimeSlots
    // season,
    // dayOfTheSeason
  } = calcOptions

  let zeroCarbonAvail = Array(noOfTimeSlots).fill(0)
  let zeroCarbonGen = Array(noOfTimeSlots).fill(0)
  let curtailment = []

  for (let j = 0; j < noOfTimeSlots; j++) {
    for (let i = 0; i < noOfTechs - noOfStorTypes; i++) {
      zeroCarbonAvail[j] += availData[i][j] * technologyData[i].zeroCarbon
      zeroCarbonGen[j] += genData[i][j] * technologyData[i].zeroCarbon
    }
  }

  for (let j = 0; j < noOfTimeSlots; j++) {
    curtailment.push(zeroCarbonAvail[j] - zeroCarbonGen[j])
    // averageCurtailmentPerDay[dayNumberInData(season, dayOfTheSeason)] +=
    //   curtailment[j]
  }
  // averageCurtailmentPerDay[dayNumberInData(season, dayOfTheSeason)] =
  //   averageCurtailmentPerDay[dayNumberInData(season, dayOfTheSeason)] /
  //   noOfTimeSlots

  return curtailment
}
