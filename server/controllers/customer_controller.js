module.exports = {
    createCustomer: (req, res) => {
        const { customerName, address, city, state, zip, customerId } = req.body
        console.log("BEGINNING OF CUSTOMER", req.body)
        req.session.user.submitted = req.body.submitted
        req.session.user.customerId = req.body.customerId;
        req.app.get('db').create_customer([customerName, address, city, state, zip]).then(response => {
            console.log("RESPONSE FROM DB", response[0].id)
            req.session.user.customerId = response[0].id;
            res.status(200).send(response);
        }).catch(error => {
            console.log("create customer controller error", error);
            res.status(500).json({ message: 'Bummer!' })
        });
    },
    getSessions: (req, res) => {
        console.log("JUMOB MUMBO", req.session.user)
        res.status(200).json(req.session.user);
     }
}