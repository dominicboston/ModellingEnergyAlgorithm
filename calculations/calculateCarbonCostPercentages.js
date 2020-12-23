export default function calculateCarbonCostPercentages ({
  annualConst,
  firstRunValues
}) {
  // COST CALCULATION //

  let {
    totalAnnualCost,
    totalAnnualCostIncreasePercent,
    totalAnnualCostOriginalPercent,
    totalAnnualCostChangePercent,
    totalAnnualCarbonChangePercent,
    totalAnnualCarbonOriginalPercent,
    totalAnnualCarbonIncreasePercent,

    totalAnnualCarbon,
    annualTechGen,
    annualDemand
  } = annualConst
  let {
    annualTechGenOriginal,
    annualDemandOriginal,
    totalAnnualCarbonOriginal,
    totalAnnualCostOriginal
  } = firstRunValues

  totalAnnualCostChangePercent =
    (1 - totalAnnualCost / totalAnnualCostOriginal) * 100

  if (totalAnnualCost === totalAnnualCostOriginal) {
    totalAnnualCostIncreasePercent = 0
    totalAnnualCostChangePercent = 0
  }
  if (totalAnnualCostChangePercent < 0) {
    totalAnnualCostIncreasePercent = Math.abs(totalAnnualCostChangePercent)
    totalAnnualCostChangePercent = 0
  }

  totalAnnualCostOriginalPercent = 100 - totalAnnualCostChangePercent

  if (totalAnnualCostOriginalPercent > 100) {
    totalAnnualCostOriginalPercent = 100
  }

  if (totalAnnualCostChangePercent > 0) {
    totalAnnualCostIncreasePercent = 0
  }

  // CARBON CALCULATION //
  totalAnnualCarbonChangePercent =
    (1 - totalAnnualCarbon / totalAnnualCarbonOriginal) * 100

  if (totalAnnualCarbonChangePercent < 0) {
    totalAnnualCarbonIncreasePercent = Math.abs(totalAnnualCarbonChangePercent)
    totalAnnualCarbonChangePercent = 0
  } else {
    totalAnnualCarbonIncreasePercent = 0
  }

  totalAnnualCarbonOriginalPercent = 100 - totalAnnualCarbonChangePercent

  if (totalAnnualCarbonOriginalPercent > 100) {
    totalAnnualCarbonOriginalPercent = 100
  }

  if (totalAnnualCarbonChangePercent > 0) {
    totalAnnualCarbonIncreasePercent = 0
  }

  return {
    totalAnnualCostChangePercent,
    totalAnnualCost,
    totalAnnualCostOriginal,
    totalAnnualCostIncreasePercent,
    totalAnnualCostOriginalPercent,
    totalAnnualCarbonChangePercent,
    totalAnnualCarbonOriginalPercent,
    totalAnnualCarbonIncreasePercent,
    totalAnnualCarbon,
    annualTechGenOriginal,
    annualDemandOriginal,
    totalAnnualCarbonOriginal,
    annualTechGen,
    annualDemand
  }
}

// #### END SECTION ####  //
