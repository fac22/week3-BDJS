BEGIN;

DROP TABLE IF EXISTS users, sessions CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    drinkorder VARCHAR(30)
    -- sugar INTEGER
);

CREATE TABLE sessions (
    sid TEXT PRIMARY KEY,
    data JSON NOT NULL
);

-- Example data
INSERT INTO users (name, email, password, drinkorder) VALUES ('Adam', 'adam@adam.com', '$2a$10$TacA7NHslEzDumr04YxXmOQ9rO4GsGcSUiCA7awUBrPFtfl.grlKK', 'Latte');
INSERT INTO sessions (sid, data) VALUES ('abcd', '{"id": 1, "email": "adam@adam.com", "name": "Adam"}');
COMMIT;