'use strict'

// Import Modules
const opencage = require('opencage-api-client') // geocoding API for getting location from addresses
const express = require('express')

// Import Helper Functions
const getDistanceFromLatLonInKm = require('../utils/getDistanceFromLatLonInKm')
const minimum = require('../utils/minimum')
const getStoresArrayFromCSV = require('../utils/getStoresArrayFromCSV')
const getLocationFromZipCode = require('../utils/getLocationFromZipCode')

// Set up express router
const router = express.Router()

// define the `/closest` route
router.get('/', async function(req, res) {
  const JSON_ARRAY = await getStoresArrayFromCSV()
  // when there's no value passed for either zip or address
  if (Object.keys(req.query).length === 0) {
    return res.status(500).json({ message: "There's no input" })
  }
  // if req.query.address !== null
  // When request url = `/closest?address=New York City, US`
  if (req.query.address) {
    await opencage
      .geocode({ q: req.query.address })
      .then(data => {
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            const place = data.results[0]
            const lat = place.geometry.lat
            const lng = place.geometry.lng
            // create a temporary distance array, to hold all the calculated distances
            let distances = []
            const stores = JSON_ARRAY.filter(element => {
              // calculate distance from input zip code to every single element in the filtered array
              let distance = getDistanceFromLatLonInKm(
                lat,
                lng,
                element.Latitude,
                element.Longitude
              )
              if (distance >= 0) {
                // distance must be >=0, extra check
                distances.push(distance)
              }
              // return only those values that have the lowest values
              if (distance === minimum(distances)) {
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
              distanceInMile: minimum(distances) / 1.621371, // convert km to mile
            })
          }
        } else {
          return res.status(data.status.code).json({
            failed: {
              statusCode: data.status.code,
              message: data.status.message,
            },
          })
        }
      })
      .catch(error => {
        return res.status(500).json({
          failed: {
            error,
          },
        })
      })
  }
  // if req.query.zip !== null
  // // When request url = `/closest?zip=55001`
  if (req.query.zip) {
    // filter the JSON_ARRAY for the relevant zip code
    let filteredZip = JSON_ARRAY.filter(element => {
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
      const location = await getLocationFromZipCode(req.query.zip)

      // create a temporary distance array, to hold all the calculated distances
      let distances = []
      // filter the filtered array further for the smallest distance
      const stores = filteredZip.filter(element => {
        // calculate distance from input zip code to every single element in the filtered array
        let distance = getDistanceFromLatLonInKm(
          location.lat,
          location.lng,
          element.Latitude,
          element.Longitude
        )
        // distance must be >=0, extra check
        if (distance >= 0) {
          distances.push(distance)
        }
        // return only those values that have the lowest values
        if (distance === minimum(distances)) {
          return true
        } else {
          return false
        }
      })

      if (req.query.units === 'km') {
        return res.status(200).json({
          closest: stores.length > 1 ? stores[0] : stores,
          distanceInKm: minimum(distances),
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
  // if both zip and address are null i.e. no value provided
  if (!req.query.zip && !req.query.address) {
    return res.status(200).json({
      message: 'Provide some valid value for ' + Object.keys(req.query)[0],
    })
  }
})

module.exports = router
