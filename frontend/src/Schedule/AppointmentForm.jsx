import React from "react";
import '../App.css';
import './schedule.css';

export class AppointmentForm extends React.Component {
    state = {
        name: "",
        notes: "",

    };

    render() {
        return <>
            <form className="masterDiv schedule">
                <legend>Book A Training Session</legend>
                <label htmlFor="yourNameInput">Your Name</label>
                <input type="text" id="yourNameInput" onChange= {event => this.setState({ name: event.target.value })}/>
                <label htmlFor="notesInput">Notes</label>
                <textarea id="notesInput" onChange= {event => this.setState({ notes: event.target.value })} />
                <button type="button" className="mx-3">Book Session</button>
            </form>
        </>;
    }
}