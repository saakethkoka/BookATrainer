import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
import { Link } from 'react-router-dom';

import React, { useState } from "react";

import { Repository } from '../api/repository.js';

class CreateTraineeAccount extends React.Component {
    repository = new Repository();

    constructor(props) {
        super(props);
        this.state = {
            userType: 'Trainee',
            nameInput: "",
            emailInput: "",
            passwordInput: "",
            genderSelect: "MALE",
            cityInput: "N/A"    //not required
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        var data = JSON.stringify({
            "name": `${this.state.nameInput}`,
            "email": `${this.state.emailInput}`,
            "gender": `${this.state.genderSelect}`,
            "city": `${this.state.cityInput}`,
            "password": `${this.state.passwordInput}`
        });

        this.repository.createTraineeAccount(data);
    }

    render() {
        return (
            <div className="text-center">
                <form name="createAccountForm" onSubmit={(event) => this.handleSubmit(event)}>
                    <label></label>
                    <input type="name" name="nameInput" placeholder="Name" required onChange={(event) => this.handleChange(event)} />
                    <input type="email" name="emailInput" placeholder="Email" required onChange={(event) => this.handleChange(event)} />
                    <br></br>
                    <label></label>
                    <input type="password" name="passwordInput" placeholder="Password" required onChange={(event) => this.handleChange(event)} />
                    <select id="genderSelect" name="genderSelect" required defaultValue={this.state.gender} onChange={(event) => this.handleChange(event)}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    <input type="text" name="cityInput" placeholder="City" onChange={(event) => this.handleChange(event)} />
                    <Link to="/" className="btn btn-primary" onClick={(event) => this.handleSubmit(event)}>Create Account</Link>
                </form>
            </div>
        )
    }
}

export default CreateTraineeAccount;