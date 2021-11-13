import React, { useEffect, useState } from 'react';
import './TrainerPage.css';
import axios from 'axios';

// React functional component
const TrainerPage = ({ match, location }) => {

    const { params: { userid } } = match;
    const [value, setValue] = useState([
        {
            "name": "Joe",
            "email": "test@smu.edu",
            "user_id": 5,
            "bio": "this is my bio"
        }])

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
                    console.log(res);
                setValue(value)
            }).catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        fetchBios();
    }, [])

    return (
        <div className="Trainers">
            <header className="Trainers-header">
                <ul>
                    {value.map((value, i) => <div className="TrainerPage-box">
                        <div className="TrainerPage-name" key={i}>
                             {value.name+"'s Page"} </div>
                        <div className="TrainerPage-bio" key={i}>{value.bio}</div>
                        <label for="collaborativa_utenti_pollo"><span class="badge bg-danger">pollo</span></label>
                        <div className="TrainerPage-email" key={i}>{"Contact Email: "+value.email}</div>
                        <button type="button" class="btn btn-primary">
                            Schedule an Appointment!
                        </button>
                        <span className="badge bg-primary">{"s"}</span>
                    </div>)}
                </ul>
                <h6>Example heading <span class="badge bg-secondary">New</span></h6>
            </header>
            <div>
            </div>
        </div>
    );

}



export default TrainerPage;