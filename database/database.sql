DROP TABLE IF EXISTS deportes;

CREATE TABLE deportes (
    posicion INTEGER NOT NULL UNIQUE,
    item VARCHAR(50) PRIMARY KEY,
    valor INTEGER NOT NULL CHECK (valor > 0)
);