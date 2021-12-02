import React, { Component } from "react";
import { Repository } from "../api/repository";

export class SessionInfo extends React.Component {
    repository = new Repository();

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            userType: null
        };
        //by default everything is off
    }

    setUserType(type) {
        this.state.userType = type;
        // var userType = this.state.userType;
        // userType = type;
        // this.setState({userType});
        localStorage.setItem('userType', type);
    }

    setId(newId) {
        //would use setState() to set, but
        //because this component never really "mounts" 
        //console gave errors. So assigned directly.
        this.state.id = newId;
        // var id = this.state.id;
        // id = newId;
        // this.setState({id});
        localStorage.setItem('id', newId);
    }

    //get the info assigned to this person
    //as soon as they create account / login
}

//when user creates account, store if they clicked trainer or trainee 
//and store userType