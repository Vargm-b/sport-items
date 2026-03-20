DROP TABLE IF EXISTS deportes;

CREATE TABLE deportes (
    item VARCHAR(50) PRIMARY KEY CHECK (
        item IN (
            'Atletismo',
            'Futsal',
            'Volley',
            'Basketball',
            'Handball',
            'Ciclismo',
            'Natacion',
            'Tenis',
            'Golf',
            'Equitacion'
        )
    ),

    posicion INTEGER GENERATED ALWAYS AS (
        CASE item
            WHEN 'Atletismo' THEN 1
            WHEN 'Futsal' THEN 2
            WHEN 'Volley' THEN 3
            WHEN 'Basketball' THEN 4
            WHEN 'Handball' THEN 5
            WHEN 'Ciclismo' THEN 6
            WHEN 'Natacion' THEN 7
            WHEN 'Tenis' THEN 8
            WHEN 'Golf' THEN 9
            WHEN 'Equitacion' THEN 10
        END
    ) STORED UNIQUE,

    valor INTEGER NOT NULL,

    CHECK (
        (item = 'Atletismo'  AND valor = 1) OR
        (item = 'Futsal'     AND valor = 2) OR
        (item = 'Volley'     AND valor = 3) OR
        (item = 'Basketball' AND valor = 4) OR
        (item = 'Handball'   AND valor = 5) OR
        (item = 'Ciclismo'   AND valor = 15) OR
        (item = 'Natacion'   AND valor = 20) OR
        (item = 'Tenis'      AND valor = 25) OR
        (item = 'Golf'       AND valor = 60) OR
        (item = 'Equitacion' AND valor = 120)
    )
);