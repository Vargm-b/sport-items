const express = require('express');
const path = require('path');
const itemsRoutes = require('./routes/items');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api/items', itemsRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

async function iniciar() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS deportes (
      item VARCHAR(50) PRIMARY KEY CHECK (
        item IN ('Atletismo','Futsal','Volley','Basketball','Handball',
                 'Ciclismo','Natacion','Tenis','Golf','Equitacion')
      ),
      posicion INTEGER GENERATED ALWAYS AS (
        CASE item
          WHEN 'Atletismo'  THEN 1
          WHEN 'Futsal'     THEN 2
          WHEN 'Volley'     THEN 3
          WHEN 'Basketball' THEN 4
          WHEN 'Handball'   THEN 5
          WHEN 'Ciclismo'   THEN 6
          WHEN 'Natacion'   THEN 7
          WHEN 'Tenis'      THEN 8
          WHEN 'Golf'       THEN 9
          WHEN 'Equitacion' THEN 10
        END
      ) STORED UNIQUE,
      valor INTEGER NOT NULL,
      CHECK (
        (item = 'Atletismo'  AND valor = 1)   OR
        (item = 'Futsal'     AND valor = 2)   OR
        (item = 'Volley'     AND valor = 3)   OR
        (item = 'Basketball' AND valor = 4)   OR
        (item = 'Handball'   AND valor = 5)   OR
        (item = 'Ciclismo'   AND valor = 15)  OR
        (item = 'Natacion'   AND valor = 20)  OR
        (item = 'Tenis'      AND valor = 25)  OR
        (item = 'Golf'       AND valor = 60)  OR
        (item = 'Equitacion' AND valor = 120)
      )
    )
  `);
  console.log('Tabla deportes lista.');

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

iniciar().catch(err => {
  console.error('Error al iniciar:', err);
  process.exit(1);
});