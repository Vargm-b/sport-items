const express = require('express');
const router = express.Router();
const pool = require('../db');

const valoresCorrectos = {
  Atletismo: 1,
  Futsal: 2,
  Volley: 3,
  Basketball: 4,
  Handball: 5,
  Ciclismo: 15,
  Natacion: 20,
  Tenis: 25,
  Golf: 60,
  Equitacion: 120
};

// GET /api/items
router.get('/', async (req, res) =>{
  try {
    const result = await pool.query(
      'SELECT * FROM deportes ORDER BY valor ASC'
    );

    return res.json(result.rows);
  } catch (error){
    console.error('Error al obtener datos:', error.message);
    return res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// GET /api/items/existe/:item
router.get('/existe/:item', async (req, res) => {
  try{
    const { item } = req.params;

    const result = await pool.query(
      'SELECT * FROM deportes WHERE LOWER(item) = LOWER($1)',
      [item]
    );

    return res.json({
      existe: result.rows.length > 0,
      datos: result.rows[0] || null
    });
  } catch (error){
    console.error('Error al verificar existencia:', error.message);
    return res.status(500).json({ error: 'Error al verificar existencia' });
  }
});

// POST /api/items
router.post('/', async (req, res) => {
  try {
    const item = req.body.item?.trim();
    const valor = Number(req.body.valor);

    if (!item || Number.isNaN(valor)){
      return res.status(400).json({ error: 'Faltan datos o son inválidos' });
    }

    if (valor <= 0){
      return res.status(400).json({ error: 'El valor debe ser mayor que 0' });
    }

    if (!(item in valoresCorrectos)){
      return res.status(400).json({
        error: 'Ese deporte no está en la lista definida'
      });
    }

    const itemExistente = await pool.query(
      'SELECT * FROM deportes WHERE LOWER(item) = LOWER($1)',
      [item]
    );

    if (itemExistente.rows.length > 0) {
      return res.status(409).json({ error: 'Ese deporte ya existe en la lista' });
    }

    if (valor !== valoresCorrectos[item]) {
      return res.status(400).json({
        error: `El valor correcto para ${item} es ${valoresCorrectos[item]}`
      });
    }

    const result = await pool.query(
      'INSERT INTO deportes (item, valor) VALUES ($1, $2) RETURNING *',
      [item, valor]
    );

    return res.status(201).json({
      mensaje: 'Ítem registrado correctamente',
      datos: result.rows[0]
    });
  } catch (error){
    console.error('Error al registrar ítem:', error.message);
    return res.status(500).json({ error: 'Error al registrar ítem' });
  }
});

module.exports = router;