CREATE TABLE userAdmin (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    password VARCHAR
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

CREATE TABLE customers (
    id SERIAL PRIMARY,
    name TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip NUMERIC
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer FOREIGN KEY(customer) REFERENCES customers(id),
    products FOREIGN KEY(products) REFERENCES products(id),
    gender TEXT,
    size TEXT,
    quantity NUMERIC
);

-- SELECT orders.*, customers.*, products.name AS product_name, products.price FROM orders
-- JOIN customers
-- ON customers.id=orders.customer
-- JOIN products
-- ON products.id=orders.products;


-- INSERT INTO products
-- (name, description, man_small_size, man_medium_size, man_large_size, man_xlarge_size, woman_small_size, woman_medium_size, woman_large_size, woman_xlarge_size, price, image)
-- VALUES (
--     'Popcorn T',
--     'Pop Pop Pop.',
--     0,
--     123,
--     0,
--     10,
--     20,
--     123,
--     83,
--     0,
--     22.00,
--     'https://res.cloudinary.com/tylermiller/image/upload/v1520121128/sakzus1w8v7gv4x4cp6k.jpg'
-- ),
-- (
--     'Chicken T',
--     'Bok Bok Bok.',
--     20,
--     123,
--     83,
--     10,
--     0,
--     0,
--     0,
--     0,
--     22.00,
--     'https://res.cloudinary.com/tylermiller/image/upload/v1520121128/sakzus1w8v7gv4x4cp6k.jpg'
-- ),
-- (
--     'Hotdog T',
--     'Hot diggity dog!',
--     0,
--     0,
--     0,
--     0,
--     20,
--     123,
--     83,
--     10,
--     27.00,
--     'https://res.cloudinary.com/tylermiller/image/upload/v1520121128/sakzus1w8v7gv4x4cp6k.jpg'
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
--     12.00,
--     'https://res.cloudinary.com/tylermiller/image/upload/v1520121128/sakzus1w8v7gv4x4cp6k.jpg'
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
--     29.00,
--     'https://res.cloudinary.com/tylermiller/image/upload/v1520121128/sakzus1w8v7gv4x4cp6k.jpg'
-- );