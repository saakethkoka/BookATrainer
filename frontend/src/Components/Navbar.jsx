import './Navbar.css';

import React, { Component } from 'react';

import logo from '../Images/temp_logo.png';

export const Navbar = props => <>
    <div id="navbar">
        <img src={logo} alt="logo" id="navLogo" />
        {/* TODO: Swap out for a ract-router-dom <Link> tag */}
        <a id="homeLink">Home</a>
    </div>
    <div id="navBloc"></div>
</>;