import './cart-dropdown.style.scss'
import Button from "../button/button.component";

import { useNavigate } from 'react-router-dom';

import {useContext} from 'react'
import {CartContext} from "../../context/cart.context";

import CartItem from "../cart-item/cart-item.component";



const CartDropdown = () =>{
    const {cartItems} = useContext(CartContext)

    const navigation = useNavigate()
    const goToCheckoutHandler = () =>{
        navigation('/checkout')
    }

    return (
      <div className='cart-dropdown-container'>
        <div className='cart-items'>
          {cartItems.map((item) =>(
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
        <Button onClick={goToCheckoutHandler} >Go to Checkout</Button>
      </div>
    )
}

export default CartDropdown