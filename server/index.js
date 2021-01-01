// Postgres Set-Up
const { Pool } = require('pg')
const keys = require('./keys')
const postgresOptions = {
  user: keys.postgres.username,
  host: keys.postgres.hostname,
  database: keys.postgres.database,
  password: keys.postgres.password,
  port: keys.postgres.portnumber,
}
const postgresClient = new Pool(postgresOptions)
const connectHandler = (postgresClient) => {
  const sql = 'create table if not exists values(number int)'
  console.log('[SERVER] running create SQL', sql)
  const catchHandler = (error) => console.error('OH DEAR!!!', error)
  postgresClient.query(sql).catch(catchHandler)
}
postgresClient.on('connect', connectHandler)
const errorHandler = () => console.error('error - lost postgres connection')
postgresClient.on('error', errorHandler)

// Redis Set-Up
const redis = require('redis')

const redisOptions = {
  host: keys.redis.hostname,
  port: keys.redis.portnumber,
  retry_strategy: () => 1000,
}
const redisClient = redis.createClient(redisOptions)
const redisPublisher = redisClient.duplicate()

// Express Set-Up
const express = require('express')
const cors = require('cors')
const server = express()
server.use(cors())
server.use(express.json())
server.get('/', (request, response) => {
  response.send('hello')
})
server.get('/values/all', async (request, response) => {
  try {
    const sql = 'select * from values'
    console.log('[SERVER] running select SQL', sql)
    const { rows } = await postgresClient.query(sql)
    response.send(rows)
  } catch (error) {
    console.error('OH DEAR ME', error)
  }
})
server.get('/values/current', (request, response) => {
  redisClient.hgetall('values', (error, values) => {
    if (error) {
      console.log('[server] error ', error)
    } else {
      console.log('[server] values ', values)
    }

    // TODO if values is null, then return an empty object
    response.send(values || {})
  })
})

server.post('/values', async (request, response) => {
  const { index } = request.body
  if (Number(index) > 99)
    return response.status(422).send('error - index must be less than 100')
  redisClient.hset('values', index, 'Nothing yet!')
  redisPublisher.publish('insert', index)
  const sql = 'insert into values(number) values($1)'
  const argList = [index]
  postgresClient.query(sql, argList)
  response.send({ working: true })
})

const {
  env: { PORT },
} = process
const callback = (error) => {
  console.error(`[server] listening on port ${PORT}`)
}
server.listen(PORT, callback)
