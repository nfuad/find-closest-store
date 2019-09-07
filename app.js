'use strict'

// Import Modules
const express = require('express')

// Import Routes
const home = require('./routes/home')
const closest = require('./routes/closest')

const app = express()

// use the routes
app.use('/', home)
app.use('/closest', closest)

// Handle Route errors

// not found error
app.use((req, res, next) => {
  const error = new Error()
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).json({
      message: 'Route Not Found',
      error: err,
    })
  }
  if (err.status === 500) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    })
  }
  next()
})

module.exports = app
