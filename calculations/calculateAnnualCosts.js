export default function calculateAnnualCosts ({
  technologyData,
  annualConst,
  dataIndex,
  sliderValues,
  calcOptions
}) {
  //Annual Cost for each technology (£M) = Annual Tech Generation (TWh) x Running Cost (£/MWh) + Capacity (GW) x [Fixed Cost (£/kW/yr) + Capex (£/kW/yr) ]
  const { annualTechCost, annualTechGen } = annualConst

  for (let i = 0; i < calcOptions.noOfTechs; i++) {
    annualTechCost[i] =
      annualTechGen[i] * technologyData[i].runCost +
      sliderValues[i] * technologyData[i].fixCost +
      Math.max(0, sliderValues[i] - technologyData[i].capStart) *
        technologyData[i].capEx
  }
  return annualTechCost
}
