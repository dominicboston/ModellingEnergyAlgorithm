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
  totalAnnualCarbonOriginal =
    initialData.optionsData.year === 2050
      ? initialData.optionsData.comparisonEmission
      : annualConst.totalAnnualCarbon
  totalAnnualCostOriginal =
    initialData.optionsData.year === 2050
      ? initialData.optionsData.comparisonWholesaleCost
      : annualConst.totalAnnualCost
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
