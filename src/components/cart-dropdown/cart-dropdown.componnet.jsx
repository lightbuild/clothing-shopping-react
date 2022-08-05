import {CartDropdownContainer,CartItems,EmptyMessage} from './cart-dropdown.style'
import Button from "../button/button.component";

import {useNavigate} from 'react-router-dom';

import {useContext} from 'react'
import {CartContext} from "../../context/cart.context";

import CartItem from "../cart-item/cart-item.component";


const CartDropdown = () => {
  const {cartItems} = useContext(CartContext)

  const navigation = useNavigate()
  const goToCheckoutHandler = () => {
    navigation('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ?
          (
            cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item}/>
          ))) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )

        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown