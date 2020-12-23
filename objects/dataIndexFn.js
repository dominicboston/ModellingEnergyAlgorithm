export default function dataIndexFn (optionsData) {
  const { noOfTechs, noOfStorTypes } = optionsData
  return {
    techNames: 0, //technology_data_position
    desc: 1, //description_position
    color: 2, //color_position
    capStart: 3, //capacity_start_position
    capMax: 4, //capacity_max_position
    zeroCarbon: 5, //zero_carbon_position
    capEx: 6, //c_apex_position
    fixedCost: 7, //fixed_cost_position
    runCost: 8, //running_cost_position
    efficiency: 9, //efficiency_position
    emissions: 10, //emissions_position
    storageHours: 11, //storage_hours_position
    shortTermStorage: noOfTechs - noOfStorTypes, //battery_tech_row
    longTermStorage: noOfTechs - noOfStorTypes + 1, //pump_tech_row
    blackout: noOfTechs - noOfStorTypes - 1, //blackout_tech_row_position
    total_number_of_columns_tech_array: 12 //total_number_of_columns_tech_array
  }
}
