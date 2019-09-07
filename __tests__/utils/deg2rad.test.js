const deg2rad = require('../../utils/deg2rad')

describe('test function deg2rad', () => {
  test('deg2rad must be defined', () => {
    expect(deg2rad).toBeDefined()
  })

  test('deg2rad must be of type function', () => {
    expect(typeof deg2rad).toBe('function')
  })

  // generic check
  test('deg2rad converts degrees to radians', () => {
    expect(deg2rad(1)).toBe(1 * (Math.PI / 180))
    expect(deg2rad(2)).toBe(2 * (Math.PI / 180))
    expect(deg2rad(3)).toBe(3 * (Math.PI / 180))
  })

  test('deg2rad cannot return null', () => {
    expect(deg2rad(1)).not.toBeNaN()
  })

  test('deg2rad must return a Number type', () => {
    expect(deg2rad(1)).toEqual(expect.any(Number))
  })
})
