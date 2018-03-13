module.exports = {
    getOrders: (req, res) => { 
        req.app.get('db').get_orders().then(orders => {
            res.status(200).json(orders);
            }).catch(error => {
                console.log("get orders controller error", error);
                res.status(500).json({ message: 'Bummer!' })
            });
    },
    createOrder: (req, res) => {
        const { customerId, cart } = req.body.user;

        req.app.get('db').create_order([customerId, cart[0].id]).then(orders => {
            res.status(200).json(orders);    
        }).catch(error => {
            console.log("post orders controller error", error);
            res.status(500).json({ message: 'Bummer!' })
         })
     }
}