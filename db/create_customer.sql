with rows as (
INSERT INTO customers
(name, address, city, state, zip)
VALUES ( $1, $2, $3, $4, $5)
RETURNING id)
SELECT id FROM rows;
