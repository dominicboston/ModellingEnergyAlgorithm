import { sum, round } from 'mathjs'
export default function calculateTotalAnnualCost ({ annualConst }) {
  return round(sum(annualConst.annualTechCost) / annualConst.annualDemand, 2)
}

// Total Annual Cost (£/Mh) = Sum all technologies { Annual Cost for each Tech (£M)  } / Annual Demand ( TWh )
