const request = require('supertest')
const app = require('../app')

describe('Test the server and some generic error handling', () => {
  test('GET / should return with a 200 statusCode', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('GET /randomURL should return with a 404 statusCode', async () => {
    // Route Not Found error handling check
    const response = await request(app).get('/randomURL')
    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({
      message: 'Route Not Found',
      error: {
        status: 404,
      },
    })
  })

  test('GET /closest should return with a 500 statusCode', async () => {
    // Since there's no input passed, it should return 500
    const response = await request(app).get('/closest')
    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({
      message: "There's no input",
    })
  })

  test('GET /closest?address should return with a 200 statusCode ', async () => {
    const response = await request(app).get('/closest/?address')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for address',
    })
  })

  test('GET /closest?zip should return with a 200 statusCode ', async () => {
    const response = await request(app).get('/closest?zip')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for zip',
    })
  })
})
