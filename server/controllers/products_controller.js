module.exports = {
  getAll: (req, res) => {
    req.app.get('db').get_products().then(products => {
        // console.log('products', products)
        res.status(200).json(products);
    }).catch(error => {
        console.log("get controller error", error);
        res.status(500).json({ message: 'Bummer!' })
    });
    },
  
    getSelect: (req, res) => { 
        req.app.get('db').get_selected(req.body.id).then(products => {
            res.status(200).send();
        }).catch(error => {
            console.log("get controller error", error);
            res.status(500).json({ message: 'Bummer!' })
        });
    },
    
    createProduct: (req, res) => {
        const { name, description, manSmallSize, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, price, image } = req.body
    
        req.app.get('db').create_product([name, description, manSmallSize, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, price, image]).then(response => {
            res.status(200).send();
        }).catch(error => {
            console.log("create controller error", error);
            res.status(500).json({ message: 'Bummer!' })
        });
    },
    
    updateProduct: (req, res) => {
        const { name, description, man_small_size, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, price, image, id } = req.body
        console.log("AXIOS UPDATE FUNCTION", req.body)
        req.app.get('db').update_product([name, description, man_small_size, manMediumSize, manLargeSize, manXLargeSize, womanSmallSize, womanMediumSize, womanLargeSize, womanXLargeSize, price, image, id]).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log("update controller error", error);
            res.status(500).json({ message: 'Bummer!' })
        });
     }
}
