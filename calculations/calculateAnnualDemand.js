import { sumProduct } from '../functions'

const calculateAnnualDemand = ({ calcOptions, annualConst }) =>
  (sumProduct(annualConst.averageDemandPerDay, calcOptions.dayYearPercent) *
    365 *
    24) /
  1000
export default calculateAnnualDemand
