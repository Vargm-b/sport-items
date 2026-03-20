const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  console.log('Entró a /api/items');
  try {
    const result = await pool.query('SELECT * FROM deportes');
    console.log('Consulta OK');
    return res.json(result.rows);
  } catch (error) {
    console.error('Error en /api/items:', error.message);
    return res.status(500).json({ error: 'Error al obtener datos' });
  }
});

module.exports = router;