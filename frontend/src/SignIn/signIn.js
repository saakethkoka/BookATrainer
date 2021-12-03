import 'bootstrap/dist/css/bootstrap.min.css';
import './signIn.css';

import React, { useState } from "react";

import { Redirect } from 'react-router-dom';
import { Repository } from '../api/repository.js';
import { SessionInfo } from '../sessionInfo/SessionInfo';

export class SignInPage extends React.Component {
    repository = new Repository();
    sessionInfo = new SessionInfo();

    constructor(props) {
        super( props )

        this.state = {
            redirect: false,
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

    onSubmit(e){
        e.preventDefault();
        this.repository.getLogin( this.state.email, this.state.password ).then( x => {
            if ( x.data ) {
                this.sessionInfo.setUserType( x.data.user_type );
                this.sessionInfo.setId( x.data.id );
                this.setState({
                    redirect: true
                })
            } else {
                alert( "Incorrect email or password" );
                this.setState({
                    password: ""
                })
            }
        });
    }

    render() {
        return ( <>
            { this.state.redirect ? (<Redirect push to="/dashboard"/>) : null }
            <form id="formId">
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
        </>);
    }
}