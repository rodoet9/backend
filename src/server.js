const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import and mount the route
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Database connection test
const pool = require('./db'); // Assuming db.js is in the same directory

// Test the database connection when the server starts
pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('❌ Database connection failed:', err);
	} else {
		console.log('✅ Database connection successful. Time:', res.rows[0].now);
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
