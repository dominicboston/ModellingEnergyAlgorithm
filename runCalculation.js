import calculateLongTermStorage from './calculations/calculateLongTermStorage'
import calculateAvailability from './calculations/calculateAvailability'
import calculateShortTermStorage from './calculations/calculateShortTermStorage'
import calculateReserves from './calculations/calculateReserves'
import calculateCurtailment from './calculations/calculateCurtailment'
import calculateAverageGeneration from './calculations/calculateAverageGeneration'
import calculateAnnualCosts from './calculations/calculateAnnualCosts'
import calculateAnnualDemand from './calculations/calculateAnnualDemand'
import calculateAverageDemand from './calculations/calculateAverageDemand'
import calculateTotalAnnualCost from './calculations/calculateTotalAnnualCost'
import calculateCarbonPerTechnology from './calculations/calculateCarbonPerTechnology'
import calculateTotalAnnualCarbon from './calculations/calculateTotalAnnualCarbon'
import calculateCarbonCostPercentages from './calculations/calculateCarbonCostPercentages'
import calculateGenerationTable from './calculations/calculateGenerationTable'
import calculateAnnualGeneration from './calculations/calculateAnnualGeneration'
import calculateSimpleAverageCharts from './calculations/calculateSimpleAverageCharts'
import firstRunOperations from './calculations/firstRunOperations'
import dataIndexFn from './objects/dataIndexFn'
import calcOptionsFn from './objects/calcOptionsFn'
import annualConstFn from './objects/annualConstFn'

import { zeroArrayTemplate, dayNumberInData } from './functions'
import { round, min, max } from 'mathjs'
function runCalculation ({ initialData, firstRunValues, sliderValues }) {
  // console.time('runCalc start')

  // console.log('RunCalculation Start', {
  //   initialData,
  //   firstRunValues,
  //   sliderValues
  // })

  const {
    daySettingsData,
    allDayData,
    optionsData,
    technologyData
  } = initialData

  let annualConst = annualConstFn(optionsData)
  const dataIndex = dataIndexFn(optionsData)
  let calcOptions = calcOptionsFn({ optionsData, allDayData })
  let {
    noOfTimeSlots,
    noOfTechs,
    noOfDayTypes,
    dayOfTheSeason,
    noOfDaysPerSeason,
    season
  } = calcOptions

  let dayChartData = []

  let demandCalcData = zeroArrayTemplate(noOfTimeSlots, noOfDayTypes)
  // let averageCurtailmentPerDay = Array(noOfDayTypes).fill(0)
  let averageGenPerDay = zeroArrayTemplate(noOfTechs, noOfDayTypes) //averageGenPerDay
  let reservesAvali = []

  for (let i = 0; i < noOfDayTypes; i++) {
    demandCalcData[i] = [...daySettingsData[i][0]]
  }
  annualConst.annualTechGen = Array(noOfDayTypes).fill(0)

  let genPowerResults = Array(noOfDayTypes).fill(0)

  if (sliderValues[dataIndex.longTermStorage] > 0) {
    calculateLongTermStorage({
      calcOptions,
      daySettingsData,
      dataIndex,
      technologyData,
      genPowerResults,
      demandCalcData,
      sliderValues
    })
  }

  for (season = 1; season <= calcOptions.noOfSeasons; season++) {
    //starts at 1??
    for (
      dayOfTheSeason = 1;
      dayOfTheSeason <= noOfDaysPerSeason;
      dayOfTheSeason++
    ) {
      calcOptions.season = season
      calcOptions.dayOfTheSeason = dayOfTheSeason

      let availData = calculateAvailability({
        calcOptions,
        daySettingsData,
        sliderValues
      }) // SLIDERS x TIME FACTORSavailData

      let genData = calculateGenerationTable({
        calcOptions,
        availData,
        demandCalcData,
        dataIndex,
        genPowerResults
      }) // CALC GENERTION FOR EACH TECH

      if (sliderValues[dataIndex.shortTermStorage] > 0) {
        genData = calculateShortTermStorage({
          sliderValues,
          calcOptions,
          dataIndex,
          technologyData,
          availData,
          genData,
          averageGenPerDay
        })
      } // BATTERY STORAGE PROGRAMavailData

      reservesAvali.push(
        round(
          calculateReserves({
            daySettingsData,
            demandCalcData,
            calcOptions,
            dataIndex,
            availData
          }),
          2
        )
      ) //calculate RESERVES

      let curtailment = calculateCurtailment({
        calcOptions,
        technologyData,
        availData,
        genData
        // averageCurtailmentPerDay
      }) // UNUSED CARBON ZERO GENERTIONavailData

      annualConst.averageGenPerDay = calculateAverageGeneration({
        calcOptions,
        genData,
        averageGenPerDay
      }) // DAY AVERAGE GENERATION PER DAY

      annualConst.averageDemandPerDay = calculateAverageDemand({
        calcOptions,
        daySettingsData,
        annualConst
      }) // DEMAND AVERAGE GENERATION PER DAYs

      // /* NEEDS ADDRESSING */

      genData.push(round(curtailment, 2))
      genData.push(
        daySettingsData[
          dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
        ][0]
      )
      dayChartData.push(round(genData, 2))

      // /* ^ NEEDS ADDRESSING ^ */

      // }     // dayNumberInDataason, dayOfTheSeasonf statment
    } //dayOfTheSeasonop
  } //season loop

  annualConst.annualTechGen = calculateAnnualGeneration({
    calcOptions,
    annualConst
  }) // ANNUAL GENERATION INC DAY PERCENTAGE
  annualConst.annualTechCost = calculateAnnualCosts({
    technologyData,
    calcOptions,
    annualConst,
    dataIndex,
    sliderValues
  }) // ANNUAL TECH RUNNING COSTS

  annualConst.annualDemand = calculateAnnualDemand({ calcOptions, annualConst }) // ANNUAL DEMAND INC DAY PERCENTAGE
  annualConst.totalAnnualCost = calculateTotalAnnualCost({
    annualConst
  }) // ANNUAL EACH TECH TOTAL COST
  annualConst.annualTechCarbon = calculateCarbonPerTechnology({
    annualConst,
    technologyData
  }) // ANNUAL CARBON PER TECHNOLOGY
  annualConst.totalAnnualCarbon = calculateTotalAnnualCarbon({
    dataIndex,
    calcOptions,
    annualConst
  }) // ANNUAL ALL TECH CARBON TOTAL

  // STORE FIRST RUN RESULTS FOR COMPARISON

  if (firstRunValues.firstRun) {
    firstRunValues = firstRunOperations({
      annualConst,
      sliderValues,
      reservesAvali,
      initialData
    })
  }
  let carbonCost = calculateCarbonCostPercentages({
    annualConst,
    firstRunValues
  })
  annualConst = { ...annualConst, ...carbonCost }

  let simpleDataCharts = calculateSimpleAverageCharts(dayChartData)
  dayChartData.push(round(simpleDataCharts.nonDroughtAverageData, 2))
  dayChartData.push(round(simpleDataCharts.droughtAverageData, 2))

  let reserveRemaining = round(min(reservesAvali) * 100, 1)

  let calculatedData = {
    simpleDataCharts,
    dayChartData,
    annualConst,
    reserveRemaining,
    reservesAvali,
    firstRunValues,
    dataIndex
  }
  // console.log('RunCalculation End', calculatedData)
  // console.timeEnd('runCalc start')

  return calculatedData
}
export default runCalculation
