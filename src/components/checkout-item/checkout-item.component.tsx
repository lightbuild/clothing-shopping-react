import {FC} from 'react'
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton
} from './checkout-item.style'

import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, removeItemFromCart, clearItemFromCart} from '../../store/cart/cart.action'
import {selectCartItems} from '../../store/cart/cart.selector'

import {CartItem} from '../../store/cart/cart.type';

type CheckoutItemProps = {
  cartItem:CartItem
}

const CheckoutItem:FC<CheckoutItemProps> = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()


  const addItemToCartHandler = () => dispatch(addItemToCart(cartItems, cartItem))
  const removeItemFromCartHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))
  const clearItemFromCartHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`}/>
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemFromCartHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemToCartHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemFromCartHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem