import React, { useEffect, useState } from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateAccountForm from './CreateAccount/CreateAccount';
import KendoCalendarTrainee from './Schedule/KendoCalendarTrainee';
import KendoCalendarTrainer from './Schedule/KendoCalendarTrainer';

// React functional component
function App () {


  return (
    <div className="App container">
      <header className="App-header"></header>
      <KendoCalendarTrainer></KendoCalendarTrainer>
    </div>
  );
}

export default App;
