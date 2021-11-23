import React, { useEffect, useState } from 'react';
import './TrainerPage.css';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import guts from './guts.png';
// React functional component
const TrainerPage = ({ match, location }) => {
    const { params: { trainerId } } = match;
    const [userId, setuserId] = useState(4);
    const [favorited, setFavorited] = useState(false)
    const [value, setValue] = useState([
        {
            "name": "Guts",
            "email": "test@smu.edu",
            "userId": 5,
            "bio": "this is my bio this is mo this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio this is my bio "
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
        }
        ])

    

    const ec2_url = ''
    // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
    const ec2 = false;
    const url = ec2 ? ec2_url : 'localhost'

    // handle input field state change
    const fetchBios = () => {
        axios.get(`http://${url}:8000/trainer/${trainerId}`).then(res => {
            console.log(res);
            const value = res.data.data;
            console.log(value);
            setValue(value)
        }).catch(err => {
            console.log(err)
        });;
    }
    const fetchBadges = () => {
        axios.get(`http://${url}:8000/badges/${trainerId}`).then(
            res => {
                const badge = res.data.data;
                    console.log(badge);
                setBadges(badge)
            }).catch(err => {
                console.log(err)
            });
    }

    const fetchIfFavorite = () => {
        axios.get(`http://${url}:8000/favoriteTrainer/${userId}/${trainerId}`).then(
                res => {
                    const value = res.data.data;
                    console.log(value);
                    setFavorited(Object.keys(value).length);
                }).catch(err => {
                    console.log(err)
                });
    }
    const toggleFavorite = () => {
        if (favorited) {
            axios.delete(`http://${url}:8000/favoriteTrainer/${userId}/${trainerId}`).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            });;
        } else {
            axios.post(`http://${url}:8000/favoriteTrainer`, {
                    "user_id": userId,
                    "trainer_id": trainerId
                 }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            });;
        }
        setFavorited(!favorited)
    }


    useEffect(() => {
        fetchBios();
        //fetchBadges();
        fetchIfFavorite();
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
                            <div className="TrainerPage-bio-image" > <img src={guts} height = {400} width= {400}/>  
                                <div className="TrainerPage-Badgebox">
                                    {badges.map((badge, i) => 
                                                        <ul>
                                                        <label for="collaborativa_utenti_pollo"><span class="badge bg-danger">{badge.activity}</span></label>
                                                        </ul>
                                                        )}
                                </div>
                            </div> 
                        </div>
                       
                        <div className="TrainerPage-email" key={i}>{"Contact Email: "+value.email}</div>
                        <button type="button" class="btn btn-primary btn-lg">
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