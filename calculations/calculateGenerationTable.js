import { dayNumberInData } from '../functions'
import { zeroArrayTemplate } from '../functions'
export default function calculateGenerationTable ({
  calcOptions,
  availData,
  demandCalcData,
  dataIndex,
  genPowerResults
}) {
  const {
    season,
    dayOfTheSeason,
    noOfTimeSlots,
    noOfTechs,
    noOfStorTypes,
    noOfDaysPerSeason
  } = calcOptions
  let genData = zeroArrayTemplate(noOfTechs, noOfTimeSlots)

  let cumulativeSum1 = Array(noOfTimeSlots).fill(0)
  let cumulativeSum2 = Array(noOfTimeSlots).fill(0)
  let demand

  for (let i = 0; i < noOfTechs - noOfStorTypes; i++) {
    for (let j = 0; j < noOfTimeSlots; j++) {
      cumulativeSum1[j] += availData[i][j]

      demand =
        demandCalcData[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ][j]

      genData[i][j] =
        Math.min(demand, cumulativeSum1[j]) -
        Math.min(demand, cumulativeSum2[j])

      cumulativeSum2[j] = cumulativeSum1[j]
    }
  }

  genData[dataIndex.longTermStorage] = Array(noOfTimeSlots).fill(
    genPowerResults[dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)]
  )

  return genData
}
