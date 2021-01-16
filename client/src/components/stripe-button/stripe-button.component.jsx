import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Logo from '../../assets/crown.svg';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_e8HpL2o1JJwXQhdUMnkXLjFU004f0QEJiG';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'POST',
      data: {
        'amount': priceForStripe,
        'token': token
      }
    }).then(response => {
      console.log(response);
      alert('Payment successful');
    }).catch(error => {
      console.log(error);
      alert('There was an issue with your payment');
    })
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      name='DevShop Wares Ltd.'
      billingAddress
      shippingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;