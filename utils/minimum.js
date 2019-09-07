'use strict'

// return the minimum value in an array
function minimum(array) {
  if (array.length === 0) {
    return null
  }
  return Math.min.apply(Math, array)
}

module.exports = minimum
