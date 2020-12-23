export default function calculateTotalAnnualCarbon ({
  dataIndex,
  calcOptions,
  annualConst
}) {
  // Total Annual Carbon (t/MWh) = sum { Carbon for each Tech (Mt)} / Annual Demand (TWh)
  let totalAnnualCarbon = 0

  for (let i = 0; i < calcOptions.noOfTechs; i++) {
    if (i !== dataIndex.blackout) {
      totalAnnualCarbon += annualConst.annualTechCarbon[i]
    }
  }
  return totalAnnualCarbon / annualConst.annualDemand
}
