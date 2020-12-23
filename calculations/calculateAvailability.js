import { dayNumberInData } from '../functions'
import { zeroArrayTemplate } from '../functions'
export default function calculateAvailability ({
  calcOptions,
  daySettingsData,
  sliderValues
}) {
  const {
    noOfTechs,
    noOfTimeSlots,
    season,
    dayOfTheSeason,
    noOfDaysPerSeason
  } = calcOptions
  let availData = zeroArrayTemplate(noOfTechs, noOfTimeSlots)

  for (let i = 0; i < noOfTechs; i++) {
    for (let j = 0; j < noOfTimeSlots; j++) {
      availData[i][j] =
        sliderValues[i] *
        daySettingsData[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ][i + 1][j]
    }
  }

  return availData
}
