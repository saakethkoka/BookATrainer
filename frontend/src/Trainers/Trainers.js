import React, { useEffect, useState } from 'react';
import './Trainers.css';
import axios from 'axios';

// React functional component
const Trainers = () => { 
    const [number, setNumber] = useState("")
    const [values, setValues] = useState([])

    // handle input field state change
    const handleChange = (e) => {
        setNumber(e.target.value);
    }

    const ec2_url = ''
    // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
    const ec2 = false;
    const url = ec2 ? ec2_url : 'localhost'

    const fetchBios = () => {
        axios.get(`http://${url}:8000/trainers`).then(
            res => {
                const values = res.data.data;
                console.log(values);
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
                <header className="Trainers-header">
                        
                        <ul>
                        {values.map((value, i) => <div className="Trainer-box">
                                                  <div className="Trainer-name" key={i}>{value.name}</div>
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