const getStoresArrayFromCSV = require('../../utils/getStoresArrayFromCSV')

describe('test function getStoresArrayFromCSV', () => {
  test('getStoresArrayFromCSV must be defined', () => {
    expect(getStoresArrayFromCSV).toBeDefined()
  })

  test('getStoresArrayFromCSV must be of type function', () => {
    expect(typeof getStoresArrayFromCSV).toBe('function')
  })

  test('getStoresArrayFromCSV must return an array', async () => {
    expect(await getStoresArrayFromCSV()).toEqual(expect.any(Array))
  })

  test('getStoresArrayFromCSV must return an array with the right objects and data types', async () => {
    const stores = await getStoresArrayFromCSV()
    expect(stores[0]['Store Name']).toEqual(expect.any(String))
    expect(stores[0]['Store Location']).toEqual(expect.any(String))
    expect(stores[0]['Address']).toEqual(expect.any(String))
    expect(stores[0]['City']).toEqual(expect.any(String))
    expect(stores[0]['State']).toEqual(expect.any(String))
    expect(stores[0]['Zip Code']).toEqual(expect.any(String))
    expect(stores[0]['Latitude']).toEqual(expect.any(String))
    expect(stores[0]['Longitude']).toEqual(expect.any(String))
    expect(stores[0]['County']).toEqual(expect.any(String))
  })

  test('getStoresArrayFromCSV cannot return null', async () => {
    expect(await getStoresArrayFromCSV()).not.toBeNaN()
  })
})
