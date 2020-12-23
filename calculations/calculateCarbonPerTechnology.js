import { dotMultiply } from 'mathjs'
export default function calculateCarbonPerTechnology ({
  annualConst,
  technologyData
}) {
  // Carbon for each Tech (Mt) = Annual Tech Generation (TWh) x Emmissions (t/MWh)
  let annualTechCarbon = dotMultiply(
    annualConst.annualTechGen,
    technologyData.map(a => a.emissions)
  )

  return annualTechCarbon
}
