module.exports = {
  redis: {
    hostname: process.env.REDIS_HOST,
    portnumber: process.env.REDIS_PORT,
  },
  postgres: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    hostname: process.env.POSTGRES_HOSTNAME,
    database: process.env.POSTGRES_DATABASE,
    portnumber: process.env.POSTGRES_PORTNUMBER,
  },
}
