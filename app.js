'use strict'

// Import Modules
const express = require('express')

// Import Routes
const home = require('./routes/home')
const closest = require('./routes/closest')

const app = express()

// use the routes
app.use(home)
app.use(closest)

// Handle Route errors
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(400).json({
      message: 'Route Not Found',
    })
  }
  if (err.status === 500) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }
  next()
})

module.exports = app
