UPDATE products
SET 
    man_small_size = $1,
    man_medium_size = $2,
    man_large_size = $3,
    man_xlarge_size = $4,
    woman_small_size = $5,
    woman_medium_size = $6,
    woman_large_size = $7,
    woman_xlarge_size = $8,
WHERE id = $9
RETURNING *;