import { max } from 'mathjs'
import { dayNumberInData } from '../functions'

import calculateAverageGeneration from './calculateAverageGeneration'
export default function calculateShortTermStorage ({
  calcOptions,
  dataIndex,
  technologyData,
  sliderValues,
  availData,
  genData,
  averageGenPerDay
}) {
  const { shortTermStorage } = dataIndex
  const {
    season,
    noOfTechs,
    noOfTimeSlots,
    noOfStorTypes,
    dayOfTheSeason,
    noOfDaysPerSeason
  } = calcOptions
  // VARIBLES FOR BATTERY STORAGE CALCULATIONS
  // Reset Each Run
  let storVolReq = 0,
    storVolNow = 0,
    storVolFilled = 0
  let storVolRemaining =
    sliderValues[shortTermStorage] *
    technologyData[shortTermStorage].storageHours
  let storAvail = Array(noOfTimeSlots).fill(sliderValues[shortTermStorage])

  // Not Reset
  let storGen = Array(noOfTimeSlots).fill(0)
  let storfill = Array(noOfTimeSlots).fill(0)

  let unusedCap = Array(noOfTimeSlots).fill(0) // Do we have this
  let extraStorFill = Array(noOfTimeSlots).fill(0)
  let extraStorGen = Array(noOfTimeSlots).fill(0)
  let hrPerTimeSlot = 24 / noOfTimeSlots

  averageGenPerDay = calculateAverageGeneration({
    calcOptions,
    genData,
    averageGenPerDay
  })
  // DAY AVERAGE GENERATION PER DAY

  for (let ir = noOfTechs - noOfStorTypes; storVolReq === 0 && ir >= 0; ir--) {
    if (
      averageGenPerDay[ir][
        dayNumberInData(season, dayOfTheSeason, noOfDaysPerSeason)
      ] > 0 &&
      technologyData[ir].emissions > 0 &&
      Math.min.apply(null, genData[ir]) === 0
    ) {
      //this tech is polluting, but there’s at least one point in day it’s not generating  so let’s try and replace with storage
      for (let j = 0; j < noOfTimeSlots; j++) {
        extraStorGen[j] = Math.min(storAvail[j], genData[ir][j]) // ???? generation(i) not ir,j in notes. ????
        storVolReq += extraStorGen[j] * hrPerTimeSlot
      } //j loop

      if (storVolReq > storVolRemaining) {
        //Not enough volume left for all of this generation so scale it all down
        for (let j = 0; j < noOfTimeSlots; j++) {
          extraStorGen[j] *= storVolRemaining / storVolReq
        } // j loop
        storVolReq = storVolRemaining
        storVolRemaining = 0
      } //end if
      else {
        storVolRemaining -= storVolReq
      }

      //Now we’re looking for low emission generation to fill the storage - Loop through each tech2(clean) starting with least polluting up to tech-1(dirty)  but only while storVolReq>0

      for (let i = 0; i < ir; i++) {
        for (let j = 0; j < noOfTimeSlots; j++) {
          unusedCap[j] = availData[i][j] - genData[i][j]
        } // j loop
        if (
          Math.max.apply(null, unusedCap) > 0 &&
          technologyData[i].emissions <
            technologyData[ir].emissions *
              technologyData[shortTermStorage].efficiency
        ) {
          // We can use this tech2 to fill the storage

          for (let j = 0; j < noOfTimeSlots; j++) {
            extraStorFill[j] = Math.min(unusedCap[j], storAvail[j])
            storVolFilled +=
              extraStorFill[j] *
              technologyData[shortTermStorage].efficiency *
              hrPerTimeSlot
          } // j loop

          if (storVolFilled > storVolReq) {
            //Woops overfilled, scale back filling
            for (let j = 0; j < noOfTimeSlots; j++) {
              extraStorFill[j] *= storVolReq / storVolFilled
            } //j loop
            storVolReq = 0
          } //end if
          else {
            storVolReq -= storVolFilled
          }

          for (let j = 0; j < noOfTimeSlots; j++) {
            storAvail[j] -= extraStorFill[j]
            genData[i][j] += extraStorFill[j]
          } //end j
        } // end if
      } // i loop

      if (storVolReq > 0) {
        //We couldn’t find enough spare low-C capacity to fill this. Scale back storage generation and quit whole storage thing
        for (let j = 0; j < noOfTimeSlots; j++) {
          storVolNow += extraStorGen[j] * hrPerTimeSlot
        } // j loop
        for (let j = 0; j < noOfTimeSlots; j++) {
          extraStorGen[j] *= storVolFilled / storVolNow
        } //j loop
      } //if statment

      for (let j = 0; j < noOfTimeSlots; j++) {
        storGen[j] += extraStorGen[j]
        storAvail[j] -= extraStorGen[j]
        storfill[j] += extraStorFill[j]
        genData[ir][j] = max(0, genData[ir][j] - extraStorGen[j])
      } //j loop
    } //end if
  } // main ir loop

  for (let j = 0; j < noOfTimeSlots; j++) {
    genData[shortTermStorage][j] = storGen[j] // stores storGen back to generation.
  } // close j loop

  return genData
} //close function
