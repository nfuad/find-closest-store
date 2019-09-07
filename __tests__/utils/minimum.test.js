const minimum = require('../../utils/minimum')

describe('test function minimum', () => {
  test('minimum must be defined', () => {
    expect(minimum).toBeDefined()
  })

  test('minimum must be of type function', () => {
    expect(typeof minimum).toBe('function')
  })

  // generic check
  test('the function minimum must return the minimum value of an array', () => {
    expect(minimum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(1)
    expect(minimum([100, -2, 3, 4, 5, 6000, 7777, 81, 9, 10])).toBe(-2)
    expect(minimum([])).toBe(null)
    expect(minimum([100])).toBe(100)
  })

  test('minimum cannot return null', () => {
    expect(minimum([1, 2, 3, 4, 5, 6])).not.toBeNaN()
    expect(minimum([0, 0, 0])).not.toBeNaN()
    expect(minimum([])).not.toBeNaN()
    expect(minimum([1, 2, 3, true, 5, 6])).not.toBeNaN()
  })

  test('minimum must return a Number type', () => {
    expect(minimum([1, 2, 4, 100, 'foo'])).toEqual(expect.any(Number))
    expect(minimum([-1, -2, 3])).toEqual(expect.any(Number))
    expect(minimum([0])).toEqual(expect.any(Number))
    expect(minimum([-1])).toEqual(expect.any(Number))
  })
})
