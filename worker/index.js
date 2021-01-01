const { fibonacci } = require('./fibonacci')
const {
  redis: { hostname, portnumber },
} = require('./keys.js')
const redis = require('redis')

// (1) Create a redis client that accepts inserts
const retry_strategy = () => 1000
const options = { host: hostname, port: portnumber, retry_strategy }
const clientOne = redis.createClient(options)

// (2) Create a redis client that responds to inserts
// by calculating the fibonnaci value of the inserted value
// and then updating a hash with the result of that calculated value
const clientTwo = clientOne.duplicate()
const handleMessage = (channel, message) => {
  clientOne.hset('values', message, fibonacci(Number(message)))
}
clientTwo.on('message', handleMessage)
clientTwo.subscribe('insert')
