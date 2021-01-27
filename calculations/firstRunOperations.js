import { min } from 'mathjs'

export default function firstRunOperations ({
  annualConst,
  sliderValues,
  reservesAvali,
  initialData
}) {
  let firstRun = false
  let annualTechGenOriginal,
    annualDemandOriginal,
    totalAnnualCarbonOriginal,
    totalAnnualCostOriginal,
    originalSliderValues,
    originalReserves

  originalSliderValues = sliderValues

  annualTechGenOriginal = annualConst.annualTechGen
  annualDemandOriginal = annualConst.annualDemand
  totalAnnualCarbonOriginal = initialData.optionsData.comparisonEmission
  totalAnnualCostOriginal = initialData.optionsData.comparisonWholesaleCost

  originalReserves = min(reservesAvali)

  return {
    firstRun,
    annualTechGenOriginal,
    annualDemandOriginal,
    totalAnnualCarbonOriginal,
    totalAnnualCostOriginal,
    originalSliderValues,
    originalReserves
  }
}
