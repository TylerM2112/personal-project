CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    stripeToken TEXT,
    name TEXT NOT NULL,
    addressLine1 TEXT NOT NULL,
    addressZip INTEGER NOT NULL,
    addressState TEXT NOT NULL,
    addressCity TEXT NOT NULL,
    addressCountry TEXT NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description TEXT,
    small_size NUMERIC,
    medium_size NUMERIC,
    large_size NUMERIC,
    xlarge_size NUMERIC,
    price DECIMAL,
    quantity INTEGER,
    image TEXT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    
)