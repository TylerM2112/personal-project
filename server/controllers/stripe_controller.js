require('dotenv').config()
const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY)


module.exports = {
    paymentAPI(req, res){
        const {source, currency, amount, acct, addresses, email} = req.body

        stripe.charges.create({source,currency,amount}, {stripe_account: acct}, (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).send({ error: stripeErr })
            } else {
                res.status(200).send({ success: stripeRes})
            }
        })
    }
}