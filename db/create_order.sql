with rows as (
INSERT INTO orders
(customer, products)
VALUES ($1, $2)
RETURNING id)
SELECT id from rows;
