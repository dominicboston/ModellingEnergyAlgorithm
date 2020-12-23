import { sumProduct } from '../functions'
import { round } from 'mathjs'
export default function calculateAnnualGeneration ({
  calcOptions,
  annualConst
}) {
  let annualTechGen = []
  for (let i = 0; i < calcOptions.noOfTechs; i++) {
    annualTechGen.push(
      (sumProduct(annualConst.averageGenPerDay[i], calcOptions.dayYearPercent) *
        24 *
        365) /
        1000
    )
  }

  return round(annualTechGen, 2)
}
//simplified difference of .034
