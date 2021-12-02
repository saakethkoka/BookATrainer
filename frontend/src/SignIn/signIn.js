import 'bootstrap/dist/css/bootstrap.min.css';
import './signIn.css';

import React, { useState } from "react";

import { Link } from 'react-router-dom';
import { Repository } from '../api/repository.js';
import { SessionInfo } from '../sessionInfo/SessionInfo';

export class SignInPage extends React.Component {
    repository = new Repository();
    sessionInfo = new SessionInfo();

    constructor(props) {
        super( props )

        this.state = {
            email: "",
            password: ""
        }
        
        this.clearData = this.clearData.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind( this )
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    clearData(){
        this.setState({
            email: "",
            password: ""
        })
    }

    handleChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    handleValidation(){
        this.repository.getLogin( this.state.email, this.state.password ).then(x => console.log(x));
    }

    onSubmit(e){
        e.preventDefault();
        if(this.handleValidation()){
            alert("Form submit")
            this.clearData()
        }
    }

    render() {
        return (
            <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input value={this.state.email} onChange={this.handleChangeEmail} type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={this.state.password} onChange={this.handleChangePassword} type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button onClick={this.onSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}