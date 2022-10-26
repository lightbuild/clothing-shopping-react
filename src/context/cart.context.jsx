import {createContext, useReducer} from 'react'

import {createAction} from "../utils/reducer/reducer.utils";



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

export const CART_ACTION_TYPE = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false
}

const cartReducer = (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPE.SET_IS_CART_OPEN:
      return{
        ...state,
        isCartOpen:payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
})

export const CartProvider = ({children}) => {
  const [{isCartOpen,cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItems = (cartItems) =>{
    const newCartCount = cartItems.reduce((total, cartItem) =>{
      return total + cartItem.quantity
    },0)

    const newCartTotal = cartItems.reduce((total,carItem) =>{
      return total + carItem.quantity * carItem.price
    },0)

    const payload = {
      cartItems,
      cartCount:newCartCount,
      cartTotal:newCartTotal
    }

    dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS,payload))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd)

    updateCartItems(newCartItems)
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems,productToRemove)

    updateCartItems(newCartItems)
  }

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems,productToClear)

    updateCartItems(newCartItems)
  }

  const setIsCartOpen = (bool) =>{
    dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN,bool))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
