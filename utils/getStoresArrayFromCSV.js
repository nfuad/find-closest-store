'use strict'

// Import Modules
const csv = require('csvtojson') // to parse the csv file and convert to json

// Set Constants
const CSV_FILE_PATH = './store-locations.csv'

// Get Data from CSV file and return it in JSON format
async function getStoresArrayFromCSV() {
  return await csv().fromFile(CSV_FILE_PATH)
}

module.exports = getStoresArrayFromCSV
