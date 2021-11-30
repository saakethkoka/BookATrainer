import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';

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
           <button onSubmit={(event) => this.handleSubmit(event)}>Create Account</button>
       </form>
        )
    }
}

// function CreateTraineeAccount() {
//     //state for storage
//     const [emailInput, setEmail] = useState("")
//     const [passwordInput, setPassword] = useState("")
//     const [userType, setUserType] = useState("Trainee")
//     const [gender, setGender] = useState("")
//     const [city, setCity] = useState("")
  
//     return (
//       <form name="createAccountForm" onSubmit={() => handleSubmit()}>
//           <label></label>
//           <input type="email" name="emailInput" placeholder="Email" required onChange={(event) => setEmail(event.target.value)} />
//           <br></br>
//           <label></label>
//           <input type="text" name="passwordInput" placeholder="Password" required onChange={(event) => setPassword(event.target.value)} />
//           <select id="genderSelect" name="genderSelect" required defaultValue={gender} onChange={(event) => setGender(event.target.value)}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <input type="text" name="cityInput" placeholder="City" required onChange={(event) => setCity(event.target.value)} />
//           <button onSubmit={() => handleSubmit()}>Create Account</button>
//       </form>
//     )
// }

export default CreateTraineeAccount;