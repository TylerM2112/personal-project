SELECT orders.*, customers.*, products.name AS product_name FROM orders
JOIN customers
ON customers.id = orders.customer
JOIN products
ON products.id = orders.products
ORDER BY orders.id;