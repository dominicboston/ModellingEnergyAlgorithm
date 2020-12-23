export const zeroArrayTemplate = (columns, rows) =>
  [...Array(columns)].map(e => Array(rows).fill(0))

export const sumProduct = (arr1, arr2) =>
  arr1.reduce((r, a, i) => r + a * arr2[i], 0)

// export const round = (value, precision) =>
//   Math.round(value * Math.pow(10, precision || 0)) /
//   Math.pow(10, precision || 0)

export const dayNumberInData = (season, dayOfTheSeason, noOfDaysPerSeason) =>
  (season - 1) * noOfDaysPerSeason + dayOfTheSeason - 1

//ASK HARVEY
