const request = require('supertest')
const app = require('../../app')

describe("Test the GET / route and it's return types", () => {
  test('GET / should return stores array in specific format', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    // Must return an array
    expect(response.body).toEqual(expect.any(Array))
    // Array must be greater than 0
    expect(response.body.length).toBeGreaterThan(0)
    // response cannot be null
    expect(response.body).not.toBeNull()
    // check every data type
    expect(response.body[0]['Store Name']).toEqual(expect.any(String))
    expect(response.body[0]['Store Location']).toEqual(expect.any(String))
    expect(response.body[0]['Address']).toEqual(expect.any(String))
    expect(response.body[0]['City']).toEqual(expect.any(String))
    expect(response.body[0]['State']).toEqual(expect.any(String))
    expect(response.body[0]['Zip Code']).toEqual(expect.any(String))
    expect(response.body[0]['Latitude']).toEqual(expect.any(String))
    expect(response.body[0]['Longitude']).toEqual(expect.any(String))
    expect(response.body[0]['County']).toEqual(expect.any(String))
  })
})
