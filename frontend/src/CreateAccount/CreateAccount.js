import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';

import React, { useState } from "react";

import CreateTraineeAccount from "./CreateTraineeAccount";
import CreateTrainerAccount from "./CreateTrainerAccount";
import axios from "axios";

export class CreateAccountForm extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
        userType: 'Trainee',
        traineeMode: false,
        trainerMode: false
    };

  }


  render() {
    return (
      <div className="createAccount">
        <h2 className="text-center">Create An Account</h2>
          {
            !this.state.trainerMode && !this.state.traineeMode && (
              <div className="selectRole text-center">
                <h3>Select your role </h3>
                <button className="btn btn-primary" onClick={() => this.setState(prevState => ({
                  trainerMode: !prevState.trainerMode
                }))}>Trainer</button>
                <button  className="btn btn-primary" onClick={() => this.setState(prevState => ({
                  traineeMode: !prevState.traineeMode
                }))}>Trainee</button>
              </div>)
          }
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