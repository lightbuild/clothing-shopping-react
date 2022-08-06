import {ChockoutContainer,ChekoutHeader,HeaderBLock,Total}  from './checkout.style'

import {useContext} from 'react'
import {CartContext} from "../../context/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const {cartItems, cartTotal} = useContext(CartContext)
  return (
    <ChockoutContainer>
      <ChekoutHeader>
        <HeaderBLock>
          <span>Product</span>
        </HeaderBLock>
        <HeaderBLock>
          <span>Description</span>
        </HeaderBLock>
        <HeaderBLock>
          <span>Quantity</span>
        </HeaderBLock>
        <HeaderBLock>
          <span>Price</span>
        </HeaderBLock>
        <HeaderBLock>
          <span>Remove</span>
        </HeaderBLock>
      </ChekoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      ))}
      <Total>TOTAL:${cartTotal}</Total>
    </ChockoutContainer>
  )
}

export default Checkout