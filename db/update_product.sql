UPDATE products
SET 
    name = $1,
    description = $2,
    man_small_size = $3,
    man_medium_size = $4,
    man_large_size = $5,
    man_xlarge_size = $6,
    woman_small_size = $7,
    woman_medium_size = $8,
    woman_large_size = $9,
    woman_xlarge_size = $10,
    price = $11,
    image = $12
WHERE id = $13
RETURNING *;