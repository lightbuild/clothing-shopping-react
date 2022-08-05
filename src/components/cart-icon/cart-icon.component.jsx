import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.style'

import {useContext} from 'react'

import {CartContext} from "../../context/cart.context";

const CartIcon = () =>{
    const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext)

    const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
      <CartIconContainer onClick={toggleCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{cartCount}</ItemCount>
      </CartIconContainer>
    )
}

export default CartIcon