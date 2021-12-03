import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { Component } from 'react';
import Navbar from "./Navbar";
import { ROUTES } from './routes.js';

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                {
                    ROUTES.map((route, index) => <Route key={index} { ...route } />)
                }
            </Switch>
        </Router>

    )
}

export default App;