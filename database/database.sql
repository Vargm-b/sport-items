DROP TABLE IF EXISTS deportes;

CREATE TABLE deportes (
    item VARCHAR(50) PRIMARY KEY,
    posicion INTEGER NOT NULL UNIQUE,
    valor INTEGER NOT NULL CHECK (valor > 0)
);