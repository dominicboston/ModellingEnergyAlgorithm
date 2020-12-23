import { dayNumberInData } from '../functions'
import { mean } from 'mathjs'
export default function calculateAverageDemand ({
  calcOptions,
  daySettingsData,
  annualConst
}) {
  const { season, dayOfTheSeason, noOfDaysPerSeason } = calcOptions

  annualConst.averageDemandPerDay[
    dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
  ] = mean(
    daySettingsData[
      dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
    ][0]
  )

  return annualConst.averageDemandPerDay
}
