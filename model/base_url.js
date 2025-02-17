const env = require('dotenv');
let host = process.env.HOST;
let port = process.env.HTTP_PORT;
const baseURL = `http://${host}:${port}`;
module.exports = baseURL;
console.log(`BaseURL is working`);
