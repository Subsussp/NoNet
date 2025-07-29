let createClient = require('redis').createClient;
require('dotenv').config()

const client = createClient({
  url: process.env.REDIS_URL, // Make sure this env variable is set on Railway
});

client.on('error', (err) => console.error('Redis Client Error', err));

module.exports = client