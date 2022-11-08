import {CategoryItem} from '../categories/categories.types';

export enum CART_ACTION_TYPE {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  SET_CART_COUT = 'cart/SET_CART_COUNT',
  SET_CART_TOTAL = 'cart/SET_IS_CART_TOTAL'
}

export type CartItem = CategoryItem & {
  quantity: number
}
