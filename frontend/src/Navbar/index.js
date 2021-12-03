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
  let mailTo = "mailto:" + helpEmail;

  const onMail = (event) => {
    window.location = mailTo;
  }

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/dashboard' exact="true" activeStyle>
            Dashboard
          </NavLink>
          <NavLink to='/trainers' activeStyle>
            Trainers
          </NavLink>
          <NavLink to='/contact-us' onClick={ event => onMail(mailTo) } activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;