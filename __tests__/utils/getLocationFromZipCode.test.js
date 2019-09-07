const getLocationFromZipCode = require('../../utils/getLocationFromZipCode')

describe('test function getLocationFromZipCode', () => {
  test('getLocationFromZipCode must be defined', () => {
    expect(getLocationFromZipCode).toBeDefined()
  })

  test('getLocationFromZipCode must be of type function', () => {
    expect(typeof getLocationFromZipCode).toBe('function')
  })

  // use the actual api to
  test('getLocationFromZipCode must return location from given zip code', async () => {
    const data = await getLocationFromZipCode(77550)
    expect(data).toStrictEqual({
      acceptable_city_names: [
        { city: 'Island', state: 'TX' },
        { city: 'Jamaica Beach', state: 'TX' },
        { city: 'Virginia Point', state: 'TX' },
      ],
      area_codes: [409],
      city: 'Galveston',
      lat: 29.310517,
      lng: -94.775814,
      state: 'TX',
      timezone: {
        is_dst: 'T',
        timezone_abbr: 'CDT',
        timezone_identifier: 'America/Chicago',
        utc_offset_sec: -18000,
      },
      zip_code: '77550',
    })

    expect(data.lat).toStrictEqual(29.310517)
    expect(data.lng).toStrictEqual(-94.775814)
  })

  test('getLocationFromZipCode cannot return null', async () => {
    expect(await getLocationFromZipCode(77550)).not.toBeNaN()
  })

  test('getLocationFromZipCode must return a Number type', async () => {
    expect(await getLocationFromZipCode(77550)).toEqual(expect.any(Object))
  })
})
