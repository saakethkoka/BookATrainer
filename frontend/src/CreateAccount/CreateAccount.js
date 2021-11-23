import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
import axios from "axios";
import CreateTraineeAccount from "./CreateTraineeAccount"; 
import CreateTrainerAccount from "./CreateTrainerAccount";

class CreateAccountForm extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
        userType: 'Trainee',
        traineeMode: false,
        trainerMode: false
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(){
  //   const {name, value} = event.target;
  //   this.setState({[name]: value});
  // }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post(`http://localhost:8000/createTrainerAccount`, {email: emailInput}).then(res => {
  //     console.log(res);
  //   })
  // }

  render() {
    return (
      <div className="createAccount">
      <h2 className="text-center">Create An Account</h2>
      {!this.state.trainerMode && !this.state.traineeMode && (
        <div className="selectRole">
        <h3>Select your role </h3>
        <button onClick={() => this.setState(prevState => ({
          trainerMode: !prevState.trainerMode
        }))}>Trainer</button>
        <button onClick={() => this.setState(prevState => ({
          traineeMode: !prevState.traineeMode
        }))}>Trainee</button>
      </div>
      )}
      
      <div>
      {this.state.traineeMode && (
        <CreateTraineeAccount></CreateTraineeAccount>
      )}
      {this.state.trainerMode && (
        <CreateTrainerAccount></CreateTrainerAccount>
      )}
      </div>
    </div>
    );
  }
}

export default CreateAccountForm;