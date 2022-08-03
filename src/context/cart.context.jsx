import {createContext, useState, useEffect} from 'react'

// import PRODUCTS_DATA from '../shop-data.json'

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    )
  } else {
    return [...cartItems, {...productToAdd, quantity: 1}]
  }
}

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

  if (existingCartItems.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
  }
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }


  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart}
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
