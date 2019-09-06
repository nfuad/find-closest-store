'use strict'

// Import Modules
const csv = require('csvtojson')
const express = require('express')

// Set Constants
const CSV_FILE_PATH = './store-locations.csv'
const PORT = process.env.PORT || 3000

// Initialize Express app
const app = express()

// Handle Requests
app.get('/', function(req, res) {
  csv()
    .fromFile(CSV_FILE_PATH)
    .then(jsonObj => {
      return res.status(200).json({
        storeDetails: jsonObj,
      })
    })
})

app.get('/closest', function(req, res) {
  if (Object.keys(req.query).length === 0) {
    return res.status(500).json({ message: "There's no input" })
  }
  if (req.query.address) {
    return res.status(200).json({ message: req.query.address })
  }
  if (req.query.zip && req.query.units) {
    return res
      .status(200)
      .json({ message: req.query.zip, 'req.query.units': req.query.units })
  }
  if (req.query.zip) {
    return res.status(200).json({ message: req.query.zip })
  }
  return res.status(200).json({
    message: 'Provide some values for ' + Object.keys(req.query)[0],
  })
})

// Start Server
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
