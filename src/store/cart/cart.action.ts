import {CategoryItem} from '../categories/categories.types';
import {createAction, withMatcher,ActionWithPayload} from '../../utils/reducer/reducer.utils';
import {CART_ACTION_TYPE, CartItem} from './cart.type';

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  } else {
    return [...cartItems, {...productToAdd, quantity: 1}];
  }
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

  if (existingCartItems && existingCartItems.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
  }
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPE.SET_CART_ITEMS, CartItem[]>


export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));

export const setCartItems = withMatcher((cartItem: CartItem[]): SetCartItems =>
  createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItem)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);

  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, productToClear);

  return setCartItems(newCartItems);
};