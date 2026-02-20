let createClient = require('redis').createClient;
require('dotenv').config()

// Create the client
const client = createClient({
  url: process.env.REDIS_URL, // your Upstash URL
  socket: {
    tls: true,
    rejectUnauthorized: false // needed for some serverless setups
  }
});

client.on('error', (err) => console.error('Redis Client Error', err));

module.exports = client