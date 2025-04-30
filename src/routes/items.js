// backend/src/routes/items.js
const express = require('express');
const router = express.Router();
const db = require('../db');

//GET
router.get('/', async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM items ORDER BY created_at DESC');
		res.json(result.rows);
	} catch (err) {
		console.error('Error fetching items:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

//POST
router.post('/', async (req, res) => {
	const { name } = req.body;

	if (!name || name.trim() === '') {
		return res.status(400).json({ error: 'Name is required' });
	}

	try {
		const result = await db.query('INSERT INTO items (name) VALUES ($1) RETURNING *', [name]);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error('Error inserting item:', err);
		res.status(500).json({ error: 'Database insert error' });
	}
});

module.exports = router;
