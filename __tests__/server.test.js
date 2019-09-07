// http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

const request = require('supertest')
const app = require('../app')

describe('Test the routes', () => {
  test('It should response the GET method for index route', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('It should return with a 500 statusCode for GET /closest', async () => {
    // Since there's no input passed, it should return 500
    const response = await request(app).get('/closest')
    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({
      message: "There's no input",
    })
  })

  test('It should return with a 200 statusCode for GET /closest?address', async () => {
    const response = await request(app).get('/closest/?address')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for address',
    })
  })
  // for an address/multiple addresses
  test('It should return with a 200 statusCode for GET /closest?address', async () => {
    const response = await request(app).get('/closest/?address')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for address',
    })
  })
  // request for multiple formats km, mi, etc.
  test('It should return with a 200 statusCode for GET /closest?address', async () => {
    const response = await request(app).get('/closest/?address')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for address',
    })
  })

  test('It should return with a 200 statusCode for GET /closest?zip', async () => {
    const response = await request(app).get('/closest?zip')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for zip',
    })
  })

  // for an address/multiple zips
  test('It should return with a 200 statusCode for GET /closest?zip', async () => {
    const response = await request(app).get('/closest?zip')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for zip',
    })
  })
  // request for multiple formats km, mi, etc.
  test('It should return with a 200 statusCode for GET /closest?zip', async () => {
    const response = await request(app).get('/closest?zip')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      message: 'Provide some valid value for zip',
    })
  })
})
