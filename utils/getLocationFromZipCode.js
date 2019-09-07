'use strict'

// Import Modules
const fetch = require('node-fetch') // fetch request to zipcodeapi for getting location from zip code

// Import Config
const config = require('../config')

async function getLocationFromZipCode(code) {
  const url = `https://www.zipcodeapi.com/rest/${config.ZIP_CODE_API_KEY}/info.json/${code}/degrees`
  const locationRes = await fetch(url)
  return await locationRes.json()
}

module.exports = getLocationFromZipCode
