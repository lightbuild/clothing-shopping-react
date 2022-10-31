import {Fragment} from 'react'
import {Outlet} from "react-router-dom";
import {useSelector} from 'react-redux'
import {selectorCurrentUser} from "../../store/user/user.selector";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import {signOutUser} from "../../utils/firebase/firebase.utils";

import {selectIsCartOpen} from "../../store/cart/cart.selector";

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.componnet";

import {NavigationContainer,LogoContainer,NavLinksContainer,NavLink} from './navigation.styles.jsx'


const Navigation = () => {
  const currentUser = useSelector(selectorCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  console.log(isCartOpen)

  const signOutHandler = async () => {
    await signOutUser()
  }
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