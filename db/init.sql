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
    man_small_size NUMERIC,
    man_medium_size NUMERIC,
    man_large_size NUMERIC,
    man_xlarge_size NUMERIC,
    woman_small_size NUMERIC,
    woman_medium_size NUMERIC,
    woman_large_size NUMERIC,
    woman_xlarge_size NUMERIC,
    price DECIMAL,
    image TEXT
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    
)


-- INSERT INTO products
-- (name, description, man_small_size, man_medium_size, man_large_size, man_xlarge_size, woman_small_size, woman_medium_size, woman_large_size, woman_xlarge_size, price, image)
-- VALUES (
--     'Popcorn T',
--     'Pop Pop Pop.',
--     20,
--     123,
--     83,
--     10,
--     20,
--     123,
--     83,
--     10,
--     22.00,
--     't-shirt.jpg'
-- ),
-- (
--     'Chicken T',
--     'Bok Bok Bok.',
--     20,
--     123,
--     83,
--     10,
--     20,
--     123,
--     83,
--     10,
--     22.00,
--     't-shirt.jpg'
-- ),
-- (
--     'Hotdog T',
--     'Hot diggity dog!',
--     20,
--     123,
--     83,
--     10,
--     20,
--     123,
--     83,
--     10,
--     22.00,
--     't-shirt.jpg'
-- ),
-- (
--     'Dog T',
--     'Sup dawg.',
--     20,
--     123,
--     83,
--     10,
--     20,
--     123,
--     83,
--     10,
--     22.00,
--     't-shirt.jpg'
-- ),
-- (
--     'ChinUp T',
--     'Hang in there!.',
--     20,
--     123,
--     83,
--     10,
--     20,
--     123,
--     83,
--     10,
--     22.00,
--     't-shirt.jpg'
-- );