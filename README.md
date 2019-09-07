# Find Closest Store

##### A Coding Challenge

### The Problem

Write a simple server that can query the dataset and find the nearest store to a provided address or zip code

```
Find Store Problem
  Your server will locate the nearest store (as the crow flies) from
  store-locations.csv, return the matching store address, as well as
  the distance to that store in JSON format

Usage:
  {server}/closest?zip=<zip>
  {server}/closest?address=<address>
  {server}/closest?zip=<zip>&units=<(mi|km)>

Options:
  ?zip=<zip>            Find nearest store to this zip code. If there are multiple best-matches, return the first.
  ?address=<address>  Find nearest store to this address. If there are multiple best-matches, return the first.
  ?units=(mi|km)        Display units in miles or kilometers [default: mi]

Note:
  addresses should be encoded for the URI
```

##### About the Stores' Data

The stores' data is found in the root directory as `store-locations.csv`. This is a tabular dataset of the locations of every store of a major national retail chain.

### The Solution

The data from the CSV files cannot be handled by Javascript without parsing. Therefore, first and foremost the store-locations.csv file needs to be parsed as JSON data, (so Javascript can actually use the data).
For getting the latitude and longitude from the input address, an external geocoding API had to be used - i.e [Open Cage Data](https://opencagedata.com/). Similarly, for getting the latitude and longitude from the input ZIP Code, another external API was used - [Zip Code API](https://www.zipcodeapi.com/)
To calculate the exact distance from one position to another, the very famous [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula) had to be implemented in Javascript (as per requirement). All the calculation are done in kilometer unit and then converted to mile by using the unit conversion forumla. Mile is returned from the API by default if no unit is specified.

### Technical Details / Caveats

##### About the solution

1. For this simple challenge, the `GET /closest` is handling both the address and zip code requests in the same file, it could be modularized further had there been no time boundness.
1. If the request is for an address, the opencagedata api is being used to get the latitude and longitude of the given address
1. then by filtering the whole JSON array containging the stores, all the distances are being stored in an array by calculating every single distance in reference to the user's address' latitude and longitude.
1. Return only the minimum value of all the distances in the distance array, and the corresponding store details
1. Return the object and the distance in the specified unit, return in miles by default as per requirement.
1. The process is almost similar for the ZIP code search
1. In case of the Zip Search, First from the whole array, create a range of smallest and highest zip codes for every single store detail item
1. Then filter the all the stores to get only those stores in which the given zip fits in
1. Use the external zip code api to get the latitude and longitude for that exact zip
1. Repeat the same process as the address by clalculating every single store in the filtered array and putting them inside an array of distances
1. Then calculate the minimum distance and return the corresponding store information

_Side Note:_ Since the index routes functionality is not explicitly mentioned in the problem it is being used to return the whole JSON data parsed from the CSV file

##### About the Tests

1. All unit tests are written in Jest and for the few integration tests, the Supertest framework is used.
1. All the utility funcitons are refactored and put into the `utils` folder for easy testing, and code readablity.
1. The tests for the utility functions are written inside the `__tests__/utils/` directory
1. The tests for each routes are written inside the `__tests__/routes` direcotry
1. The `server.test.js` contains some of the generic tests like error handling, and edge cases for the whole API

### Tech Stack

0. Express - for the API server, routing, etc.
1. csvtojson module - to parse CSV file to JSON data
1. node-fetch module - to handle fetch requests for zip code api
1. opencage-api-client module - to get location details from address
1. Jest and Supertest frameworks were used for unit testing and integration testing
1. Prettier and Eslint - for linting and code formatting

### Running Locally

Follow these steps to run the web app on your local machine

0. Open up your terminal and type: git clone https://github.com/nfuad/find-closest-store.git
1. Then enter into the cloned repo from the terminal using: cd find-closest-store (assuming the directory name wasn't changed while cloning)
1. In the terminal, type `npm install`
1. Create a .env file
1. Get the API keys from [Open Cage Data](https://opencagedata.com/) & [Zip Code API](https://www.zipcodeapi.com/) respectively.
1. Put the API keys in the .env file like so:
   `ZIP_CODE_API_KEY="your_api_key_here"`
   `OCD_API_KEY="your_api_key_here"`
1. Lastly use `npm run dev` to start the dev server at http://localhost:3000

#### Avialable Commands

0. `npm run dev`: To start the server with nodemon
1. `npm run start`: To start the server with node
1. `npm run test`: To run the tests using Jest
1. `npm run test:watch`: To watch for test file changes using Jest
1. `npm run lint`: To lint using eslint

### Live Demo

For your convenience, you can find the Live API server here: http://find-closest-store.herokuapp.com

### LICENSE

[MIT](./LICENSE)

In this folder there is

##### Notes

0. Focus was mainly on completing the challenge, rather than framework/scaffolding).
1. External geocoding service(s) were used
1. The Haversine Formula for distance calcuation was used.
