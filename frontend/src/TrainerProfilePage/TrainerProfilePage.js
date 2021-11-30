import './TrainerProfilePage.css';

import React, { useState } from "react";

export class TrainerProfile extends React.Component {
  state = {
    name: "Bark Mrubaker",
    pictureUrl: "http://placehold.it/300x300",
    rating: 4,
    activities: ["Basketball", "Yoga", "Climbing"],
    certifications: ["Being cool I guess", "Skillz", "Fun times"],
    location: "Dallas, Texas"
};


  render() {
    return <>
      <div className="trainerProfile">
        <div className="column" id="leftCol">
            <img src={ this.state.pictureUrl } id="profilePic" />
            <hr />
            <button className="btn btn-primary btn-lg w-100"> Schedule an Apointment</button>    
        </div>
        <div className="column" id="rightCol">
            <div id="profileName" >{ this.state.name }</div>
            <div id="profileLocation" >{this.state.location}</div>
            <div id="ratingText" >Rating</div>
            <div id="stars" >Put stars here filled based on rating</div>
            <button className="btn btn-secondary" >Send Message</button>
            <button className="btn btn-secondary" >contact</button>
            <hr />
            <div className="leftText" >activities</div>
            <div className="leftText" >Icons showing activities</div>
            <div className="leftText" >certifications</div>
            <div className="leftText" >Icons showing certifications</div>
        </div>
      </div>
    </>;
  }
}