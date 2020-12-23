import calculateAvailability from './calculateAvailability'
import { dayNumberInData, sumProduct } from '../functions.js'
import { mean, sum } from 'mathjs'
export default function calculateLongTermStorage ({
  calcOptions,
  daySettingsData,
  dataIndex,
  technologyData,
  genPowerResults,
  demandCalcData,
  sliderValues
}) {
  let {
    dayYearPercent,
    noOfStorTypes,
    noOfTimeSlots,
    noOfTechs,
    dayOfTheSeason,
    noOfDaysPerSeason,
    noOfSeasons,
    season
  } = calcOptions

  //  VARIBLES FOR PUMP STORAGE CALCULATIONS

  let expectedZeroCarbonGenDaily = Array(noOfDaysPerSeason + 1).fill(0)

  let residualDemandDaily = Array(noOfDaysPerSeason).fill(0)
  let avgResidualDemandDaily

  let maxStoredEnergy, maxDeliveredEnergy
  let pumpPower = Array(noOfDaysPerSeason + 1).fill(0)
  let pumpEfficiency = technologyData[dataIndex.longTermStorage].efficiency
  let pumpCap = sliderValues[dataIndex.longTermStorage]
  let genPower = Array(noOfDaysPerSeason).fill(0)

  let deliveryFactor
  let currentSeasonDayYearPercentage = [0]

  // Set pumpEfficiency, pumpCap
  for (season = 1; season <= noOfSeasons; season++) {
    currentSeasonDayYearPercentage = [0] //resets this array
    expectedZeroCarbonGenDaily = Array(noOfDaysPerSeason + 1).fill(0) //For each Season:
    for (
      dayOfTheSeason = 1;
      dayOfTheSeason <= noOfDaysPerSeason;
      dayOfTheSeason++
    ) {
      //For each Day:
      calcOptions.season = season
      calcOptions.dayOfTheSeason = dayOfTheSeason

      let availData = calculateAvailability({
        sliderValues,
        calcOptions,
        daySettingsData
      })

      currentSeasonDayYearPercentage.push(
        dayYearPercent[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ]
      ) // sets up this array for later use

      for (let i = 0; i < noOfTechs - noOfStorTypes; i++) {
        //Calculate expectedZeroCarbonGenDaily as average of (Capacity that’s renewable * availability for each time period)

        if (technologyData[i].zeroCarbon === 1) {
          expectedZeroCarbonGenDaily[dayOfTheSeason] += mean(availData[i])
        }
      } //DONE

      residualDemandDaily[dayOfTheSeason] =
        mean(
          demandCalcData[
            dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
          ]
        ) - expectedZeroCarbonGenDaily[dayOfTheSeason] //Calculate residualDemandDaily for each day. This is Average (Demand for each time period) – expectedZeroCarbonGenDaily
    } //End day loop

    // This following Loop calculates sum of al day year percentages in the current season
    //End of Sum Loop

    avgResidualDemandDaily =
      sumProduct(residualDemandDaily, currentSeasonDayYearPercentage) /
      sum(currentSeasonDayYearPercentage) //Calculate the avgResidualDemandDaily. This is the sum(residualDemandDaily * DayFactor) / sum (DayFactor)

    //Calculate max energy available from pump storage and max energy delivered:

    maxStoredEnergy = 0
    maxDeliveredEnergy = 0

    for (
      dayOfTheSeason = 1;
      dayOfTheSeason <= noOfDaysPerSeason;
      dayOfTheSeason++
    ) {
      //For each Day:

      pumpPower[dayOfTheSeason] = Math.min(
        pumpCap,
        avgResidualDemandDaily - residualDemandDaily[dayOfTheSeason]
      ) //pumpPower(day) = Min ( pumpCap , avgResidualDemandDaily – residualDemandDaily)
      pumpPower[dayOfTheSeason] = Math.max(pumpPower[dayOfTheSeason], 0) //pumpPower(day) = Max (pumpPower(day), 0)
      maxStoredEnergy +=
        pumpPower[dayOfTheSeason] *
        8760 *
        dayYearPercent[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ] *
        pumpEfficiency //maxStoredEnergy += pumpPower(day) * 8760*DayFactor(day) * pumpEfficiency

      genPower[dayOfTheSeason] = Math.min(
        pumpCap,
        residualDemandDaily[dayOfTheSeason] - avgResidualDemandDaily
      ) //genPower(day) = Min ( pumpCap, residualDemandDaily – avgResidualDemandDaily)
      genPower[dayOfTheSeason] = Math.max(genPower[dayOfTheSeason], 0) //genPower(day) = Max (genPower(day), 0)
      maxDeliveredEnergy +=
        genPower[dayOfTheSeason] *
        8760 *
        dayYearPercent[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ] //maxDeliveredEnergy += genPower(day)*8760* DayFactor(day)
    } //End day loop

    deliveryFactor = maxStoredEnergy / maxDeliveredEnergy //	deliveryFactor = maxStoredEnergy/ maxDeliveredEnergy

    if (deliveryFactor < 1) {
      //If deliveryFactor<1  //This is the usual situation due to losses in storage
      for (
        dayOfTheSeason = 1;
        dayOfTheSeason <= noOfDaysPerSeason;
        dayOfTheSeason++
      ) {
        //For each Day:
        genPower[dayOfTheSeason] *= deliveryFactor //	genPower(day) *= deliveryFactor
      } //End day loop
    } else {
      for (
        dayOfTheSeason = 1;
        dayOfTheSeason <= noOfDaysPerSeason;
        dayOfTheSeason++
      ) {
        //Else
        //For each Day:
        pumpPower[dayOfTheSeason] /= deliveryFactor //	pumpPower(day) /= deliveryFactor
      } //End day loop
    } //End if

    for (
      dayOfTheSeason = 1;
      dayOfTheSeason <= noOfDaysPerSeason;
      dayOfTheSeason++
    ) {
      for (let j = 0; j < noOfTimeSlots; j++) {
        demandCalcData[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ][j] += pumpPower[dayOfTheSeason] //pumpPower (day) gets added to demand at all time points in that day
        demandCalcData[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ][j] -= genPower[dayOfTheSeason]
      }
      genPowerResults[
        dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
      ] = genPower[dayOfTheSeason] //genPower(day)  becomes the generation of Pump storage for every time point in that day			 	//Add Generation Generate
    } // Temp Demand Store for Calcaulations
  } //Next season

  return { genPowerResults, demandCalcData }
}
