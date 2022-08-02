import {createContext,useState,useEffect} from 'react'

import PRODUCTS_DATA from '../shop-data.json'




export const CartContext = createContext({
  isCartOpen:false,
  setIsCartOpen:()=>{},
  cartItems:[],
  addItemToCart:()=>{},
  removeItemFromCart:()=>{},
  clearItemFromCart:()=>{},
})

export const CartProvider = ({children}) =>{
    const [isCartOpen,setIsCartOpen] = useState(false)
    const [cartItems,setCartItems] = useState(PRODUCTS_DATA)



    const value = {isCartOpen,setIsCartOpen,cartItems,setCartItems}
    return(
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
