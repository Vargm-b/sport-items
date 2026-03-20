const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/items
// GET /api/items?orden=asc
// GET /api/items?orden=desc
router.get('/', async (req, res) => {
  try {
    const { orden } = req.query;

    let query = 'SELECT * FROM deportes ORDER BY posicion ASC';

    if (orden === 'asc') {
      query = 'SELECT * FROM deportes ORDER BY valor ASC';
    } else if (orden === 'desc') {
      query = 'SELECT * FROM deportes ORDER BY valor DESC';
    }

    const result = await pool.query(query);
    return res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos:', error.message);
    return res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// GET /api/items/existe/:item
router.get('/existe/:item', async (req, res) => {
  try {
    const { item } = req.params;

    const result = await pool.query(
      'SELECT * FROM deportes WHERE LOWER(item) = LOWER($1)',
      [item]
    );

    return res.json({
      existe: result.rows.length > 0,
      datos: result.rows[0] || null
    });
  } catch (error) {
    console.error('Error al verificar existencia:', error.message);
    return res.status(500).json({ error: 'Error al verificar existencia' });
  }
});

// POST /api/items
router.post('/', async (req, res) => {
  try {
    const item = req.body.item?.trim();
    const posicion = Number(req.body.posicion);
    const valor = Number(req.body.valor);

    if (!item || Number.isNaN(posicion) || Number.isNaN(valor)) {
      return res.status(400).json({ error: 'Faltan datos o son inválidos' });
    }

    if (posicion < 1 || posicion > 10) {
      return res.status(400).json({ error: 'La posición debe estar entre 1 y 10' });
    }

    if (valor <= 0) {
      return res.status(400).json({ error: 'El valor debe ser mayor que 0' });
    }

    // verificar límite de 10 items
    const countResult = await pool.query('SELECT COUNT(*) FROM deportes');
    const total = Number(countResult.rows[0].count);

    if (total >= 10) {
      return res.status(400).json({ error: 'Solo se permiten 10 items' });
    }

    // verificar si ya existe el item
    const itemExistente = await pool.query(
      'SELECT * FROM deportes WHERE LOWER(item) = LOWER($1)',
      [item]
    );

    if (itemExistente.rows.length > 0) {
      return res.status(409).json({ error: 'Ese item ya existe' });
    }

    // verificar si ya existe la posición
    const posicionExistente = await pool.query(
      'SELECT * FROM deportes WHERE posicion = $1',
      [posicion]
    );

    if (posicionExistente.rows.length > 0) {
      return res.status(409).json({ error: 'Esa posición ya está ocupada' });
    }

    const result = await pool.query(
      'INSERT INTO deportes (item, posicion, valor) VALUES ($1, $2, $3) RETURNING *',
      [item, posicion, valor]
    );

    return res.status(201).json({
      mensaje: 'Ítem registrado correctamente',
      datos: result.rows[0]
    });
  } catch (error) {
    console.error('Error al registrar ítem:', error.message);
    return res.status(500).json({ error: 'Error al registrar ítem' });
  }
});

module.exports = router;