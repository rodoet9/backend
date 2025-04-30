// // backend/src/db.js
// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME,
// });

// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);

// pool
// 	.connect()
// 	.then(() => console.log('✅ Connected to PostgreSQL'))
// 	.catch(err => console.error('❌ Connection error', err.stack));

// module.exports = pool;

const { Pool } = require('pg');
require('dotenv').config();

// Use DB_URL from environment variables
const pool = new Pool({
	connectionString: process.env.DB_URL, // Use the DB_URL from the .env file
	ssl: {
		rejectUnauthorized: false, // Add this for Render database SSL connection
	},
});

pool
	.connect()
	.then(() => console.log('✅ Connected to PostgreSQL (Render DB)'))
	.catch(err => console.error('❌ Connection error', err.stack));

module.exports = pool;
