import { dayNumberInData } from '../functions'
import { mean } from 'mathjs'
export default function calculateAverageGeneration ({
  calcOptions,
  genData,
  averageGenPerDay
}) {
  const { noOfTechs, season, dayOfTheSeason, noOfDaysPerSeason } = calcOptions

  for (let i = 0; i < noOfTechs; i++) {
    averageGenPerDay[i][
      dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
    ] = mean(genData[i])
  }

  return averageGenPerDay
}
