import {
  Bars,
  Nav,
  NavBtn,
  NavBtnLink,
  NavLink,
  NavMenu
} from './NavbarElements';

import React from 'react';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>
            Dashboard
          </NavLink>
          <NavLink to='/trainers' activeStyle>
            Trainers
          </NavLink>
          <NavLink to='/default-app' activeStyle>
            Default app
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;