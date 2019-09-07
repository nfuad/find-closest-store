const getDistanceFromLatLonInKm = require('../../utils/getDistanceFromLatLonInKm')

describe('test function getDistanceFromLatLonInKm', () => {
  test('getDistanceFromLatLonInKm must be defined', () => {
    expect(getDistanceFromLatLonInKm).toBeDefined()
  })

  test('getDistanceFromLatLonInKm must be of type function', () => {
    expect(typeof getDistanceFromLatLonInKm).toBe('function')
  })

  // generic check
  test('getDistanceFromLatLonInKm must return the distance from latitude and longitude', () => {
    expect(getDistanceFromLatLonInKm(0, 0, 0, 0)).toEqual(0)
    expect(getDistanceFromLatLonInKm(1, 1, 1, 1)).toEqual(0)
    expect(getDistanceFromLatLonInKm(-1, 0, 1, 0)).toEqual(222.38985328911747)
    expect(getDistanceFromLatLonInKm(0, 1, 0, 1)).toEqual(0)
    expect(getDistanceFromLatLonInKm(1, 1, 0, 1)).toEqual(111.19492664455873)
    expect(getDistanceFromLatLonInKm(0, 1, 0, 0)).toEqual(111.19492664455873)
    expect(getDistanceFromLatLonInKm(-1, 11, 0, 1)).toEqual(1117.4388924988439)
  })

  test('getDistanceFromLatLonInKm cannot return null', () => {
    expect(getDistanceFromLatLonInKm(0, 0, 0, 0)).not.toBeNaN()
  })

  test('getDistanceFromLatLonInKm must return a Number type', () => {
    expect(getDistanceFromLatLonInKm(0, 0, 0, 0)).toEqual(expect.any(Number))
  })
})
