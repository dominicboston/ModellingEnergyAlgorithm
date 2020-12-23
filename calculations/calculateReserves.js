import { dayNumberInData } from '../functions'

export default function calcualteReserves ({
  daySettingsData,
  calcOptions,
  dataIndex,
  availData,
  demandCalcData
}) {
  const {
    noOfTimeSlots,
    noOfTechs,
    season,
    dayOfTheSeason,
    noOfDaysPerSeason
  } = calcOptions
  let reservesAvali = []
  let accumulator
  for (let j = 0; j < noOfTimeSlots; j++) {
    accumulator = 0
    for (let i = 0; i < noOfTechs; i++) {
      if (i !== dataIndex.blackout) {
        accumulator +=
          i === dataIndex.shortTermStorage
            ? 0.3 * availData[i][j]
            : i === dataIndex.longTermStorage
            ? 0.5 * availData[i][j]
            : availData[i][j]
      }
    }

    reservesAvali.push(
      (accumulator -
        daySettingsData[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ][0][j]) /
        accumulator
    )
  }

  return reservesAvali
}
