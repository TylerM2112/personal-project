require('dotenv').config()
const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY)


module.exports = {
    paymentAPI(req, res) {
        const { source, currency, amount, acct, addresses, email } = req.body

        stripe.charges.create({ source, currency, amount }, { stripe_account: acct }, (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).send({ error: stripeErr })
            } else {
                const { customerId, cart, gender, size, quantity } = req.session.user;
                console.log("NEW", req.session.user)
                cart.map((e) => {
                    req.app.get('db').create_order([customerId, e.id, e.gender, e.size, e.quantity]).then(orders => {
                    }).catch(error => {
                        console.log("post orders controller error", error);
                        res.status(500).json({ message: 'Bummer!' })
                    });
                })
                res.status(200).send({ success: stripeRes })
            }
        })
    }
}