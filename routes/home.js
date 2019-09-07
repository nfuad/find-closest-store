'use strict'

// Import Modules
const express = require('express')

// Import Helper Functions
const getStoresArrayFromCSV = require('../utils/getStoresArrayFromCSV')

// Set up express router
const router = express.Router()

// define the `/closest` route
router.get('/', async function(req, res) {
  // Just return the whole array
  return res.json(await getStoresArrayFromCSV())
})

module.exports = router
