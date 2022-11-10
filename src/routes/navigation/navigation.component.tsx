import {Fragment} from 'react'
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrentUser} from "../../store/user/user.selector";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {signOutStart} from '../../store/user/user.action'

import {selectIsCartOpen} from "../../store/cart/cart.selector";

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.componnet";

import {NavigationContainer,LogoContainer,NavLinksContainer,NavLink} from './navigation.styles.js'


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch()

  const signOutHandler =  () => dispatch(signOutStart())

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo'/>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutHandler}> SIGN OUT</NavLink>
            ) : (
              <NavLink to='auth'>
                SIGN IN
              </NavLink>
            )
          }
          <CartIcon />
        </NavLinksContainer>
        {
          isCartOpen &&  <CartDropdown/>
        }
      </NavigationContainer>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation