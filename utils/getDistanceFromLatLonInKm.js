'use strict'

// Import Helper Functions
const deg2rad = require('./deg2rad')

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

module.exports = getDistanceFromLatLonInKm
