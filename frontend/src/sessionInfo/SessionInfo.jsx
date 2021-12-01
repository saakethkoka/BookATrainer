import { Component } from "react";
import { Repository } from "../api/repository";

export class SessionInfo extends React.Component {
    repository = new Repository();

    constructor(props) {
        super(props);
        this.state = {
            id = null,
            trainerStatus = false,
            traineeStatus = false
        };
        //by default everything is off
    }

    //get the info assigned to this person
    //as soon as they create account / login
    //from database
}