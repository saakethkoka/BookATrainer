import React, { useEffect, useState } from 'react';
import './Trainers.css';
import axios from 'axios';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

// React functional component
const Trainers = () => { 
    const [values, setValues] = useState([
        {
            "name": "Joe",
            "email": "test@smu.edu",
            "user_id": 5,
            "bio": "this is my bio"
        }   ])
    const [searchTerm, setSearchTerm] = useState("");
    // handle input field state change

    const ec2_url = ''
    // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
    const ec2 = false;
    const url = ec2 ? ec2_url : 'localhost'

    const fetchBios = () => {
        axios.get(`http://${url}:8000/trainers`).then(
            res => {
                const values = res.data.data;
                console.log(values);
                console.log(res);
                setValues(values)
            }).catch(err => {
                console.log(err)
            });
    }
    // tell app to fetch values from db on first load (if initialized)
    useEffect(() => {
        fetchBios();
    }, [])

    
        return (
            <div className="Trainers">
                <input type = "text" placeholder = "search..." onChange = {(event)=> {setSearchTerm(event.target.value);}}/>
                <header className="Trainers-header">
                        <ul>
                        {values.filter((value)=> {
                            if(searchTerm ===  "")
                            {
                                return value
                            } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return value
                            }
                        }).
                        map((value, i) => <div className="Trainer-box">
                            <div className="Trainer-name" key={i}>
                                <Link to={`/Trainer/${value.user_id}`}> {value.name} </Link> </div>
                                                  <div className="Trainer-bio" key={i}>{value.bio}</div>
                                                  <div className="Trainer-email" key={i}>{value.email}</div>
                                                  </div>)}
                        </ul>
                
                </header>
                <div>
                </div>
            </div>
        );
}

export default Trainers;