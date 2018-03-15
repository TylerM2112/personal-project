module.exports = {
    getOrders: (req, res) => { 
        req.app.get('db').get_orders().then(orders => {
            res.status(200).json(orders);
            }).catch(error => {
                console.log("get orders controller error", error);
                res.status(500).json({ message: 'Bummer!' })
            });
    }
    // createOrder: (req, res) => {
    //     const { customerId, cart, gender, size, quantity } = req.body.user;
    //     cart.map((e) => {
    //         req.app.get('db').create_order([customerId, e.id, e.gender, e.size, e.quantity]).then(orders => {   
    //     }).catch(error => {
    //         console.log("post orders controller error", error);
    //         res.status(500).json({ message: 'Bummer!' })
    //      });
    //     })
    //  }
}