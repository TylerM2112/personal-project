import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';


const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
    alert('Payment Successful');
  };

  const errorPayment = data => {
      alert('Payment Error');
        // console.log(data);    
  };

  const onToken = (amount, description) => token =>
  axios.post('/api/payment',
    {
      description,
      source: token.id,
      currency: "USD",
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => {
    
    return (
        <StripeCheckout
            name={'GENERIC SHOP TITLE'}
            description={description}
            amount={fromDollarToCent(amount)}
            token={onToken(amount, description)}
            currency="USD"
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
  />
    );
};

export default Checkout;