import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import DefaultApp from './defaultApp/defaultApp';
import Navbar from "./Navbar"
import TrainerPage from './TrainerPage/TrainerPage'
import Trainers from './Trainers/Trainers'
import Dashboard from './Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/Trainers' component={Trainers} />
                <Route path='/Trainer/:trainerId' component={TrainerPage} />
                <Route path='/DefaultApp' component={DefaultApp} />
            </Switch>
        </Router>

    )
}

export default App;