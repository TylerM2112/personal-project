module.exports = {
    createCustomer: (req, res) => {
        const { customerName, address, city, state, zip, customerId } = req.body
        req.session.user.submitted = req.body.submitted
        req.session.user.customerId = req.body.customerId;
        req.app.get('db').create_customer([customerName, address, city, state, zip]).then(response => {
            console.log("create customer controller", req.session)
            res.status(200).send(response);
        }).catch(error => {
            console.log("create customer controller error", error);
            res.status(500).json({ message: 'Bummer!' })
        });
    }
}