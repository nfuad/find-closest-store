'use strict'

const app = require('./app')

// Start Server
const server = app.listen(process.env.PORT || 3000, () =>
  console.log(`See you at http://localhost:${server.address().port}`)
)
