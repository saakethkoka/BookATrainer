import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Calendar } from '@progress/kendo-react-dateinputs';
import React, { useEffect, useState} from "react";
import './schedule.css';
import { Repository } from '../api/repository';
import { SessionInfo } from '../sessionInfo/SessionInfo';


export const KendoCalendarTrainer = props => {
    const [date, setDate] = useState(null);
    const [chosenSlot, setChosenSlot] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    let repository = new Repository;
    let sessionInfo = new SessionInfo;

    //choose a date
    //make time slots for that date
    //make submit button to submit times for that date
    useEffect(() => {
        console.log("/use effect");
    }, [timeSlots])

    const changedDate = event => {
        //reset to new date
        setDate(event.value);
        //reset times
        setTimeSlots([]);
    }

    let newSlot = {
        trainer_id: parseInt(localStorage.getItem('id')),
        start_times: [],
        end_times: []
    }

    const addTimeToSlots = (startTime, endTime) => {
        let stringTime = startTime + " - " + endTime;
        timeSlots.push(stringTime);   
        console.log(timeSlots);

        let newSlotStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(startTime) - 6);
        let textSlotStart = newSlotStart.toISOString().slice(0, 19).replace('T', ' ');

        let newSlotEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(endTime) - 6);
        let textSlotEnd = newSlotEnd.toISOString().slice(0, 19).replace('T', ' ');

        newSlot.start_times.push(textSlotStart);
        newSlot.end_times.push(textSlotEnd);

        repository.addASlot(newSlot);
    }


    return (
        <div className="center">
        <div>
            <h2 className="text-white">Create Your Schedule</h2>
            <Calendar value={ date } onChange={ event => changedDate(event) }></Calendar>
            <h6 className="text-white">Selected Date: { date?.toDateString() }</h6>
            {
                chosenSlot && <h6 className="text-white">Deleted Selected Time: { chosenSlot }</h6>

            }
        </div>
        <div className="col-2">
            {
                timeSlots.map((slot, index) => 
                    <button className="btn btn-primary m-3" 
                    key={index}
                    type="button"
                    onClick={ event => setChosenSlot(slot) }>
                        {slot}
                    </button> 
                )
            }
        </div>
        <div>
            {

                date && <form className="form-row">
                    <div className="col">
                        <label htmlFor="sessionStartTime" className="m-3 align-top text-white">Start Time: </label>
                        <input type="time" id="sessionStartTime" className="m-3" onChange={ event => setStartTime(event.target.value) }></input>
                        <br/>
                        <label htmlFor="sessionEndTime" className="m-3 align-top text-white">End Time: </label>
                        <input type="time" id="sessionEndTime" className="m-3" onChange={ event => setEndTime(event.target.value) }></input>
                    </div>
                    <button className="btn btn-primary m-3" type="button" onClick={ event => addTimeToSlots(startTime, endTime) }>Submit</button>
                </form>
            }
        </div>
        </div>
    )
}
