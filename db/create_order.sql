-- with rows as (
-- INSERT INTO orders
-- (customer, products)
-- VALUES ($1, $2)
-- RETURNING id)
-- SELECT id from rows;
INSERT INTO orders
(customer, products, gender, size, quantity)
VALUES ($1, $2, $3, $4, $5);
