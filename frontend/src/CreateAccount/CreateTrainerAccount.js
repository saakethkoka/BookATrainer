import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
import axios from "axios";

class CreateTrainerAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "Trainer",
            nameInput: "",
            emailInput: "",
            passwordInput: "",
            genderSelect: "MALE", 
            cityInput: "N/A", //not required
            bioInput: "N/A" //not required
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        var axios = require('axios');
        var data = JSON.stringify({
            "name": `${this.state.nameInput}`,
            "email": `${this.state.emailInput}`,
            "gender": `${this.state.genderSelect}`,
            "city": `${this.state.cityInput}`,
            "bio": `${this.state.bioInput}`,
            "password": `${this.state.passwordInput}`
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8000/createTrainerAccount',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config).then(function(response) {
            console.log(JSON.stringify(response.data));
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return(
            <form name="createAccountForm" onSubmit={(event) => this.handleSubmit(event)}>
                <label></label>
                <input type="name" name="nameInput" placeholder="Name" required onChange={(event) => this.handleChange(event)} />
                <input type="email" name="emailInput" placeholder="Email" required onChange={(event) => this.handleChange(event)} />
                <br></br>
                <label></label>
                <input type="password" name="passwordInput" placeholder="Password" required onChange={(event) => this.handleChange(event)} />
                <select id="genderSelect" name="genderSelect" required defaultValue={this.state.genderSelect} onChange={(event) => this.handleChange(event)}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <input type="text" name="cityInput" placeholder="City" onChange={(event) => this.handleChange(event)} />
                <textarea name="bioInput" placeholder="Your bio" onChange={(event) => this.handleChange(event)} />
                <button onSubmit={(event) => this.handleSubmit(event)}>Create Account</button>
            </form>
        )
    }
}

export default CreateTrainerAccount;