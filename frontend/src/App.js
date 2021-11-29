import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar"
import DefaultApp from './defaultApp/defaultApp';
import Trainers from './Trainers/Trainers'
import TrainerPage from './TrainerPage/TrainerPage'
function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact component={DefaultApp} />
                <Route path='/Trainers' component={Trainers} />
                <Route path='/Trainer/:trainerId' component={TrainerPage} />
                <Route path='/DefaultApp' component={DefaultApp} />
            </Switch>
        </Router>

    )
}

export default App;