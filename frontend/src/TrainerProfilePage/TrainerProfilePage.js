import './TrainerProfilePage.css';

import { Link } from 'react-router-dom';
import React from "react";
import ReactStars from "react-rating-stars-component";
import { Repository } from '../api/repository';
import { getProfilePicture } from '../ProfilePictures/pictures';

export class TrainerProfile extends React.Component {
    repository = new Repository();

    state = {
        id: undefined,
        name: undefined,
        email: undefined,
        bio: undefined,
        rating: undefined,
        activities: [ "Basketball", "Yoga", "Climbing" , "Swimming", "Hiking" , "Biking", "Running" , "Coin Tossing", "Speed Walking"],
        certifications: undefined,
        location: "Dallas, Texas"
    };

    getTrainerId = () => {
        const {trainerId} = this.props.match.params;
        console.log("Trainer: " + trainerId);
        return parseInt(trainerId);
      }
    
      trainerId = this.getTrainerId();

    render() {
        if ( !this.state.name || !this.state.certifications || !this.state.rating ) {
            return <div>Loading...</div>
        }

        return <>
            <div className="trainerProfile">
                <div className="column" id="leftCol">
                    <img src={ getProfilePicture(this.state.id) } id="profilePic" alt="Profile pic" />
                    <hr />
                    <Link to={`/sessions/${this.trainerId}`} className="btn btn-primary btn-lg w-100" id="scheduleButton" > Schedule an Apointment</Link>
                </div>
                <div className="column" id="rightCol">
                    <div id="profileName" >{ this.state.name }</div>
                    <div id="profileLocation" >{ this.state.location }</div>
                    <div id="rating">
                        <div id="ratingText" >Rating</div>
                        <div id="ratingNum"> { this.state.rating } </div>
                        <div id="stars">
                            <ReactStars 
                                value={ this.state.rating }
                                edit={ false }
                                size={ 40 }
                                isHalf={ true }
                            />
                        </div>
                    </div>
                    <div id="reachOut">
                        <button id="message" className="btn btn-secondary" >Send Message</button>
                        <a id="contact" className="btn btn-secondary" href={ "mailto:" + this.state.email } >Contact</a>
                    </div>
                    <hr />
                    <div className="skillList" >
                        Bio
                        <div id="profileBio" >{ this.state.bio }</div>
                    </div>
                    <hr />
                    <div className="skillList" >
                        Activities
                        <br />
                        {
                            this.state.activities.map( activity => 
                                <span className="activity badge badge-secondary" > { activity } </span>
                            )
                        }
                    </div>
                    <div className="skillList" >
                        Certifications
                        <br />
                        {
                            this.state.certifications.map( certification => 
                                <span className="activity badge badge-secondary" > { certification } </span>
                            )
                        }
                    </div>
                    <hr />
                    <div id="moreInfo" >More information</div>
                    <div id="email"> E-mail: { this.state.email } </div>
                </div>
            </div>
        </>;
    }

    componentDidMount() {
        let id = this.props.match.params.trainerId;
        if ( id ) {
            this.repository.getTrainer( id ).then( trainer => this.setState( {
                id: id,
                name: trainer.name,
                bio: trainer.bio,
                email: trainer.email,
                //Add location when the route is updated
            } ) );
            this.repository.getTrainerRating( id ).then( trainer => {
                if ( trainer.rating ) {
                    this.setState( {
                        rating: trainer.rating
                    } )
                } else {
                    this.setState( {
                        rating: "No rating"
                    } )
                }
                
            } );
            this.repository.getTrainerCertifications( id ).then( certs => this.setState( {
                certifications: certs
            } ) );
            //this.repository.getTrainer(id).then(trainer => console.log(trainer));
        } else {
            alert( "Component requires trainerId parameter" );
        }
    }
}