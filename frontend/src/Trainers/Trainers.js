import React, { useEffect, useState } from 'react';
import './Trainers.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import guts from './guts.png';
import FilterButton  from './FilterButton';
// React functional component
const Trainers = () => { 
    const [values, setValues] = useState([
        {
            "name": "Joe",
            "email": "test@smu.edu",
            "trainer_id": 3,
            "bio": "this is my bio, this is my biothis is my biothis is my biothis is my biothis is my bio"
        },
        {
            "name": "Steve",
            "email": "test@smu.edu",
            "trainer_id": 4,
            "bio": "this is my bio, this is my biothis is my biothis is my biothis is my biothis is my bio"
        }
         ])
    const [badges, setBadges] = useState([{
        trainer_id: 3, activity_id:3, activity_name: "basketball"},
     {trainer_id: 3, activity_id:1, activity_name: "volleyball"},
     {trainer_id: 4, activity_id:2, activity_name: "swimming"}]);
    const [activities, setActivities] = useState([{
        activity_name:"volleyball"},{activity_name:"swimming"},{activity_name:"basketball"}])
    const [isSelected, setIsSelected] = useState(Array(activities.length).fill(false));
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBadges, setSearchBadges] = useState([]);
    // handle input field state change

    const ec2_url = ''
    // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
    const ec2 = false;
    const url = ec2 ? ec2_url : 'localhost'

    const selectFilterButton = (index) => {
        setIsSelected(isSelected => isSelected.map((selected, i) => i === index ? !selected: selected));
        console.log(isSelected);
   }

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
    const fetchBadges = () => {
        axios.get(`http://${url}:8000/badges`).then(
            res => {
                const badges = res.data.data;
                console.log(badges);
                console.log(res);
                setBadges(badges)
            }).catch(err => {
                console.log(err)
            });
    }
    const fetchActivities = () => {
        axios.get(`http://${url}:8000/activities`).then(
            res => {
                const activities = res.data.data;
                console.log(activities);
                console.log(res);
                setActivities(activities)
            }).catch(err => {
                console.log(err)
            });
    }

    //build activities array for filtering
    const buildArrays = () => {
        let result  = [];
        let result2 = Array(activities.length).fill(false);
        values.map((value, i) => 
        {
            badges.filter((badge)=> {
                if(badge.trainer_id === value.trainer_id)
                {
                    return badge;
                }    
                return false
            }).map((badge, i2) => 
                    {
                        result2 = result2.map((a, i3) => i3 + 1  === badge.activity_id ? a=true : a);
                        console.log(result2);
                        return false
                    }
                )
            result2.unshift(value.trainer_id);
            result.push(result2);
            result2 = Array(activities.length).fill(false);
        return false})
        console.log(result);
        setSearchBadges(result)
    }
    // tell app to fetch values from db on first load (if initialized)
    useEffect(() => {
        fetchBios();
        fetchBadges();
        fetchActivities();
        buildArrays();
    }, [])

    useEffect(() => {
        buildArrays();
        const a = Array(activities.length).fill(false);
        setIsSelected(a);
    }, [values,activities])
    //checks if a trainer's array of activites would qualify to show up by comparing it the array of selected filter activities
    const qualify = (b) => {
        var countMatch = 0;
        var countTrue = isSelected.filter(w => w === true).length;
        
        for(let x = 0; isSelected.length > x; x++)
        {
            if(isSelected[x] === true 
                && b[x+1] === true){
                countMatch++;
              }
        }
        return countMatch >=countTrue;
      };
      
    //helps to find the index for appropriate trainer when filtering
    const findIndex = (needle, haystack) =>
    {
        for(let x = 0; haystack.length > x; x++)
        {
            if(haystack[x][0] === needle)
                return x;
        }
        return 0;
    }
        return (
            <div className="Trainers">
                <div className="Trainers-filter">
                    <div className="Trainers-filter-container">
                        <div className="Trainers-filter-searchbox">
                            <input type = "text" placeholder = "search..." onChange = {(event)=> {console.log(searchBadges); setSearchTerm(event.target.value);}}/>
                        </div>
                        <div className="Trainers-filter-activitiesbox" >
                            {activities.map((value, i) =>
                                <div className="Trainers-filter-activitiesbutton" key={i}>
                                    <FilterButton name={value.activity_name} onClick={() => selectFilterButton(i)}/>
                                </div>
                            )}
                    
                        </div>
                    </div>
                 </div>
                
                <header className="Trainers-header">
                        <ul>
                        {values.filter((value)=> {
                            if(searchTerm ==="")
                            {
                                return value
                            } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return value
                            }
                            return false
                        }).filter((value)=> {
                            if(qualify(searchBadges[findIndex(value.trainer_id, searchBadges)]))
                            {
                                return value
                            }
                            else if (qualify(Array(isSelected.length).fill(false))){
                                return value
                            }
                            return false
                        })
                    .map((value, i) => 
                    <div className="Trainers-box" key={i}>
                        <div className="Trainers-name" >
                                <Link to={`/Trainer/${value.trainer_id}`}> {value.name} </Link> </div>
                        <div className="Trainers-bio-box" >  
                            <div className="Trainers-bio-desc"> {value.bio}  </div> 
                            <div className="Trainers-bio-image" > <img src={guts} alt="Trainer" height = {400} width= {400}/>  
                                <div className="TrainerPage-Badgebox">
                                    {badges.filter((badge)=> {
                                            if(badge.trainer_id === value.trainer_id)
                                            {
                                                return badge;
                                            }    return false
                                            }).map((badge, i) => 
                                                        <ul>
                                                        <label htmlFor="collaborativa_utenti_pollo"><span className="badge bg-danger">{badge.activity_name}</span></label>
                                                        </ul>
                                                        )}
                                </div>
                            </div> 
                        </div>
                       
                        <div className="Trainers-email" >
                            {"Contact Email: "+value.email}</div>
                    
                        </div>)
                    }
                    </ul>
                </header>
                <div>
                </div>
            </div>
        );
}

export default Trainers;