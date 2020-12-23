export default function annualConstFn (optionsData) {
  return {
    annualTechGen: Array(optionsData.noOfTechs).fill(0),
    // annualTechGenOriginal: Array(optionsData.noOfTechs).fill(0),
    annualTechCost: Array(optionsData.noOfTechs).fill(0),
    // annualDemand,
    // annualDemandOriginal, //calculated from average_demand_per_day
    // totalAnnualCost,
    // totalAnnualCostIncrease,
    // totalAnnualCostOriginal,
    totalAnnualCostOriginalPercent: 100,
    totalAnnualCostIncreasePercent: 0,
    // totalAnnualCostChangePercent,
    // totalAnnualCarbon,
    // totalAnnualCarbonOriginal,
    totalAnnualCarbonOriginalPercent: 0,
    totalAnnualCarbonIncreasePercent: 0,
    // totalAnnualCarbonChangePercentage,
    annualTechCarbon: Array(optionsData.noOfTechs).fill(0),
    averageDemandPerDay: Array(optionsData.noOfDayTypes).fill(0), // used to calculate annual demand
    averageGenPerDay: []
  }
}

//   annual_technology_generation: Array(noOfTechs).fill(0),
//   annual_technology_generation_original: Array(noOfTechs).fill(0),
//   annual_technology_cost: Array(noOfTechs).fill(0),
//   annual_demand,
//   annual_demand_original, //calculated from average_demand_per_day
//   total_annual_cost,
//   total_annual_cost_increase,
//   total_annual_cost_original,
//   total_annual_cost_original_percentage: 100,
//   total_annual_cost_increase_percentage: 0,
//   total_annual_cost_change_percentage,
//   total_annual_carbon,
//   total_annual_carbon_original,
//   total_annual_carbon_original_percentage: 0,
//   total_annual_carbon_increase_percentage: 0,
//   total_annual_carbon_change_percentage,
//   annual_technology_carbon: Array(noOfTechs).fill(0),
//   average_demand_per_day: Array(noOfDayTypes).fill(0), // used to calculate annual demand
