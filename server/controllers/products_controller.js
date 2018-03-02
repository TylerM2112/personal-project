module.exports = {
  getAll: (req, res) => {
    req.app.get('db').get_products().then(products => {
        console.log('products', products)
        res.status(200).json(products);
    }).catch(error => {
        console.log('Oh no! An error has happened!', error);
        res.status(500).json({ message: 'Bummer!' })
    });
  },
    
    createProduct: (req, res) => {
        const { name, description, manSmallSize, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, price, image } = req.body
        req.app.get('db').create_product([name, description, manSmallSize, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, price, image]).then(response => {
            res.status(200).send();
        }).catch(error => {
            console.log("controller error", error);
        });
    }  
}
