export default function calcOptionsFn ({ optionsData, allDayData }) {
  let dayYearPercent = []

  for (const dayTypeInfo of allDayData) {
    if (dayTypeInfo.yearPercentage !== null) {
      dayYearPercent.push(+dayTypeInfo.yearPercentage)
    }
  }

  return {
    currencySymb: optionsData.currency, //var currency = <?php echo "\"".$currency."\"" ?>;
    minReserveAccep: optionsData.minReserve,
    noOfDayTypes: optionsData.noOfDayTypes, //var number_of_day_types = <?php echo $no_of_days ?>;
    noOfSeasons: optionsData.noOfSeasons, // = <?php echo $no_of_seasons ?>;
    noOfStorTypes: optionsData.noOfStorTypes, //var number_storage_types = <?php echo $no_of_storage_types ?>;
    noOfTechs: optionsData.noOfTechs, //var number_of_technologies = <?php echo $no_of_technologies ?>;
    noOfTimeSlots: optionsData.noOfTimeSlots, //var number_of_time_slots = <?php echo $no_time_slots ?>;
    timeSlotLabel: optionsData.timeSlotLabels,
    dayYearPercent: dayYearPercent, //var day_year_percentage = <?php echo json_encode($day_year_percentage); ?>;
    season: 0,
    dayOfTheSeason: 0, // day_of_the_season
    noOfDaysPerSeason: optionsData.noOfDayTypes / optionsData.noOfSeasons //number_days_per_season
  }
}
