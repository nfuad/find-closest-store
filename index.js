'use strict'

// Import Modules
const csv = require('csvtojson')
const express = require('express')
const fetch = require('node-fetch')

// Import Config
const config = require('./config')

// Set Constants
const CSV_FILE_PATH = './store-locations.csv'
const PORT = process.env.PORT || 3000

// Declare placeholder var for the json array
let JSON_ARRAY

// Helper functions
// -------------------

// degree to radian formula
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

// An implementation of the haversine formula https://en.wikipedia.org/wiki/Haversine_formula
// to get the "as the crow flies" distance in Km
// Stack Overflow answer: https://stackoverflow.com/a/27943/8158422
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  let R = 6371 // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1) // deg2rad below
  let dLon = deg2rad(lon2 - lon1)
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c // Distance in km
  return d
}

// Get Data from CSV file and store it the JSON_ARRAY
csv()
  .fromFile(CSV_FILE_PATH)
  .then(array => {
    JSON_ARRAY = array
  })

// Initialize Express app
const app = express()

// Handle Requests
app.get('/', function(req, res) {
  return res.json(JSON_ARRAY)
})

app.get('/closest', async function(req, res) {
  if (Object.keys(req.query).length === 0) {
    return res.status(500).json({ message: "There's no input" })
  }
  if (req.query.address) {
    return res.status(200).json({ message: req.query.address })
  }
  // if req.query.zip !== null
  if (req.query.zip) {
    // filter the JSON_ARRAY for the relevant zip code
    let filtered = JSON_ARRAY.filter(element => {
      // get the range from the zip codes
      const zipRange = element['Zip Code'].split('-')
      // get the highest zip code in the range
      const highest = zipRange[0]
      // create the lowest zip code in the range
      const lowest = zipRange[0][0] + zipRange[1]
      return (
        parseInt(req.query.zip) >= parseInt(lowest) &&
        parseInt(req.query.zip) <= parseInt(highest)
      )
    })

    try {
      const url = `https://www.zipcodeapi.com/rest/${config.ZIP_CODE_API_KEY}/info.json/${req.query.zip}/degrees`
      const locationRes = await fetch(url)
      // the lat and long for the input zip code
      // can be acessed from the location like: location.lat, location.lng
      const location = await locationRes.json()
      // create a temporary distance array, to hold all the calculated distances
      let distances = []
      // filter the distance array for the smallest distance
      const stores = filtered.filter(element => {
        // calculate distance from input zip code to every single element in the filtered array
        let distance = getDistanceFromLatLonInKm(
          location.lat,
          location.lng,
          element.Latitude,
          element.Longitude
        )
        if (distance >= 0) {
          // distance must be >=0, extra check
          distances.push(distance)
        }
        // return only those values that have the lowest values
        if (distance === Math.min.apply(Math, distances)) {
          return true
        } else {
          return false
        }
      })

      if (req.query.units === 'km') {
        return res.status(200).json({
          closest: stores.length > 1 ? stores[0] : stores,
          distanceInKm: Math.min.apply(Math, distances),
        })
      }

      // by default, send the response for miles (if no units is specified)
      return res.status(200).json({
        closest: stores.length > 1 ? stores[0] : stores,
        distanceInMile: Math.min.apply(Math, distances) / 1.621371, // convert km to mile
      })
    } catch (err) {
      return res.json({
        failed: {
          message: 'There was an error fetching the location',
        },
      })
    }
  }
  return res.status(200).json({
    message: 'Provide some values for ' + Object.keys(req.query)[0],
  })
})

// Start Server
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
