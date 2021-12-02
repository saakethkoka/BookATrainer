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
  let helpEmail = "bookATrainerHelp@gmail.com";

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/' exact="true" activeStyle>
            Dashboard
          </NavLink>
          <NavLink to='/trainers' activeStyle>
            Trainers
          </NavLink>
          <NavLink to={{pathname: "mailto:" + helpEmail}} activeStyle>
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