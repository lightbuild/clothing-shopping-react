import {createAction} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPE} from "./cart.type";

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


export const setIsCartOpen = (bool) =>
   createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN,bool)




export const addItemToCart = (cartItems,productToAdd) => {
  const newCartItems = addCartItem(cartItems,productToAdd)

  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS,newCartItems)
}

export const removeItemFromCart = (cartItems,productToRemove) => {
  const newCartItems = removeCartItem(cartItems,productToRemove)

  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS,newCartItems)
}

export const clearItemFromCart = (cartItems,productToClear) => {
  const newCartItems = clearCartItem(cartItems,productToClear)

  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS,newCartItems)
}