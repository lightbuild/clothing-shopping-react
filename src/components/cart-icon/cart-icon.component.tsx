import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.style'

import {useSelector,useDispatch} from 'react-redux'

import {selectCartCount,selectIsCartOpen} from '../../store/cart/cart.selector'
import {setIsCartOpen} from '../../store/cart/cart.action'


const CartIcon = () =>{
    const dispatch = useDispatch()

    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

    return (
      <CartIconContainer onClick={toggleCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{cartCount}</ItemCount>
      </CartIconContainer>
    )
}

export default CartIcon