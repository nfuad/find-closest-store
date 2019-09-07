const request = require('supertest')
const app = require('../../app')

describe("Test the GET /closest route and it's error handling", () => {
  // When proper values are provided, the api should correctly return the closest server
  test('GET /closest?address="some address" should return with a 200 statusCode and the closest store', async () => {
    const response = await request(app).get('/closest/?address="New Jersey"')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      closest: {
        Address: '5537 W Broadway Ave',
        City: 'Crystal',
        County: 'Hennepin County',
        Latitude: '45.0521539',
        Longitude: '-93.364854',
        State: 'MN',
        'Store Location': 'SWC Broadway & Bass Lake Rd',
        'Store Name': 'Crystal',
        'Zip Code': '55428-3507',
      },
      distanceInMile: 10.410665598542144,
    })
  })

  // The distance must be returned according to the unit requested
  test('GET /closest?address="some address"&units=unit should return with a 200 statusCode and the closest store', async () => {
    // When unit = km (kilometers)
    const response1 = await request(app).get(
      '/closest/?address="New Jersey"&units=km'
    )
    expect(response1.statusCode).toBe(200)
    expect(response1.body).toStrictEqual({
      closest: {
        Address: '5537 W Broadway Ave',
        City: 'Crystal',
        County: 'Hennepin County',
        Latitude: '45.0521539',
        Longitude: '-93.364854',
        State: 'MN',
        'Store Location': 'SWC Broadway & Bass Lake Rd',
        'Store Name': 'Crystal',
        'Zip Code': '55428-3507',
      },
      distanceInKm: 16.879551292173872,
    })

    // When unit = mi (miles)
    const response2 = await request(app).get(
      '/closest/?address="New Jersey"&units=mi'
    )
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toStrictEqual({
      closest: {
        Address: '5537 W Broadway Ave',
        City: 'Crystal',
        County: 'Hennepin County',
        Latitude: '45.0521539',
        Longitude: '-93.364854',
        State: 'MN',
        'Store Location': 'SWC Broadway & Bass Lake Rd',
        'Store Name': 'Crystal',
        'Zip Code': '55428-3507',
      },
      distanceInMile: 10.410665598542144,
    })
  })

  // When proper values are provided, the api should correctly return the closest server
  test('GET /closest?zip="someZipCode" should return with a 200 statusCode and the closest store', async () => {
    const response = await request(app).get('/closest?zip=35801')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      closest: {
        Address: '601 Colonial Rd',
        City: 'Memphis',
        County: 'Shelby County',
        Latitude: '35.1135223',
        Longitude: '-89.903388',
        State: 'TN',
        'Store Location': 'SWC Colonial Rd & Poplar Ave',
        'Store Name': 'Memphis Central',
        'Zip Code': '38117-5132',
      },
      distanceInMile: 3.591316395778169,
    })
  })

  // The distance must be returned according to the unit requested
  test('GET /closest?zip="someZipCode"&units=unit should return with a 200 statusCode and the closest store', async () => {
    // When unit = mi (miles)
    const response1 = await request(app).get('/closest?zip=35801&units=mi')
    expect(response1.statusCode).toBe(200)
    expect(response1.body).toStrictEqual({
      closest: {
        Address: '601 Colonial Rd',
        City: 'Memphis',
        County: 'Shelby County',
        Latitude: '35.1135223',
        Longitude: '-89.903388',
        State: 'TN',
        'Store Location': 'SWC Colonial Rd & Poplar Ave',
        'Store Name': 'Memphis Central',
        'Zip Code': '38117-5132',
      },
      distanceInMile: 3.591316395778169,
    })

    // When unit = km (kilometers)
    const response2 = await request(app).get('/closest?zip=35801&units=km')
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toStrictEqual({
      closest: {
        Address: '601 Colonial Rd',
        City: 'Memphis',
        County: 'Shelby County',
        Latitude: '35.1135223',
        Longitude: '-89.903388',
        State: 'TN',
        'Store Location': 'SWC Colonial Rd & Poplar Ave',
        'Store Name': 'Memphis Central',
        'Zip Code': '38117-5132',
      },
      distanceInKm: 5.822856255939245,
    })
  })
})
