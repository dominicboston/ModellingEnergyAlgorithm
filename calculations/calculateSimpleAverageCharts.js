import { mean } from 'mathjs'

export default function calculateSimpleAverageCharts (dayChartData) {
  let clonedArray = [...dayChartData]

  let droughtAverageChartData = []
  droughtAverageChartData.push(clonedArray.splice(3, 1))
  droughtAverageChartData.push(clonedArray.splice(6, 1))

  droughtAverageChartData = mean([...droughtAverageChartData], 0)
  clonedArray = mean([...clonedArray], 0)

  return {
    droughtAverageData: droughtAverageChartData[0],
    nonDroughtAverageData: clonedArray
  }
}
