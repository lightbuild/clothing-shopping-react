import {useState} from 'react'
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import {useSelector} from 'react-redux'

import {selectCartTotal} from "../../store/cart/cart.selector";
import { selectorCurrentUser } from '../../store/user/user.selector';

import {BUTTON_TYPE_CLASS} from '../button/button.component'

import {PaymentFormContainer, FormContainer,PaymentButton} from './payment-form.style'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const amount =useSelector(selectCartTotal)
  const currentUser = useSelector(selectorCurrentUser)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) =>{
    e.preventDefault();

    if(!stripe || !elements){
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch('/.netlify/functions/create-payment-intent',{
      method:"post",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({amount:amount*100})
    }).then(res => res.json())

    //得到客户密钥
    const clientSecret = response.paymentIntent.client_secret;

    //得到用户订单结果
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Light Build',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
      }
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement/>
        <PaymentButton
          buttonType={BUTTON_TYPE_CLASS.inverted}
          isLoading={isProcessingPayment}
        >Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm