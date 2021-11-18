import React, { useEffect, useState } from 'react';
import './TrainerPage.css';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import guts from './guts.png';
// React functional component
const TrainerPage = ({ match, location }) => {
    const { params: { userid } } = match;

    const [favorited, setFavorited] = useState(false)
    const [value, setValue] = useState([
        {
            "name": "Guts",
            "email": "test@smu.edu",
            "user_id": 5,
            "bio": "this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio "
        }])

    const [badges, setBadges] = useState([
        {
          "activity": "basketball"  
        }
         ,
        {
            "activity": "basketball"  
        }
        ,
        {
            "activity": "basketball"  
        }
        ,
        {
            "activity": "basketball"  
        }
        ,
        {
            "activity": "basketball"  
        },
        {
            "activity": "basketball"  
        },
        {
            "activity": "basketball"  
        },
        {
            "activity": "basketball"  
        },
        {
            "activity": "basketball"  
        },
        {
            "activity": "basketball"  
        },
        {
            "activity": "basketball"  
        }
        ])

    

    const ec2_url = ''
    // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
    const ec2 = false;
    const url = ec2 ? ec2_url : 'localhost'

    // handle input field state change
    const fetchBios = () => {
        axios.get(`http://${url}:8000/trainer`,
            {
                params: {
                    "user_id": userid
                }
            }).then(
            res => {
                const value = res.data.data;
                    console.log(value);
                setValue(value)
            }).catch(err => {
                console.log(err)
            });
    }
    const fetchBadges = () => {
        axios.get(`http://${url}:8000/badges`,
            {
                params: {
                    "user_id": userid
                }
            }).then(
            res => {
                const badge = res.data.data;
                    console.log(badge);
                setBadges(badge)
            }).catch(err => {
                console.log(err)
            });
    }
    const toggleFavorite = () => {
        setFavorited(!favorited)
    }

    useEffect(() => {
        fetchBios();
        fetchBadges();
    }, [])

    return (
        <div className="Trainers">
            <header className="Trainers-header">
            
                
            
                    {value.map((value, i) => 
                    <div className="TrainerPage-box">

                        <div className="TrainerPage-name" key={i}>
                             {value.name+"'s Page"} 
                        </div>

                        <div className="TrainerPage-star">
                            {<FaStar color={favorited ? "Orange" : "grey"} onClick={toggleFavorite} size={50}/>}
                                <span class="tooltiptext">{favorited ? "Unfavorite this Trainer" : "Favorite this Trainer"}</span>
                        </div>

                        <div className="TrainerPage-bio-box" key={i}>  
                        <div className="TrainerPage-bio-desc"> {value.bio}  </div> 
                            <div className="TrainerPage-bio-image" > <img src={guts} height = {400} width= {400}/> </div> 
                        </div>
                        <div className="TrainerPage-Badgebox">
                        {badges.map((badge, i) => 
                                                <ul>
                                                  <label for="collaborativa_utenti_pollo"><span class="badge bg-danger">{badge.activity}</span></label>
                                                </ul>
                                                  )}
                        </div>
                        <div className="TrainerPage-email" key={i}>{"Contact Email: "+value.email}</div>
                        <button type="button" class="btn btn-primary">
                            Schedule an Appointment!
                        </button>
                    </div>)}
            </header>
            <div>
            </div>
        </div>
    );

}



export default TrainerPage;