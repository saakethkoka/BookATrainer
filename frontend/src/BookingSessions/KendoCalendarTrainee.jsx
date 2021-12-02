import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Calendar } from '@progress/kendo-react-dateinputs';
import React, { useEffect, useState} from "react";
import './schedule.css';
import { Repository } from '../api/repository';
import { SessionInfo } from '../sessionInfo/SessionInfo';


export const KendoCalendarTrainee = props => {
    let repository = new Repository();
    let sessionInfo = new SessionInfo;

    const [date, setDate] = useState(null);
    const [chosenSlot, setChosenSlot] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        //get time slots from API ideally
        //for now we'll just set them manually

        //but dont do anything if there is no booking Date selected
        //kind of need a date in order to list times
        if (!date) {
            return;
        }

        let someSlots = [
            "08:00 - 10:00",
            "12:00 - 14:00",
            "18:00 - 20:00"
        ]

        setTimeSlots(someSlots);

        //call this useEffect() again if the date changes
        //so we can get that day's times from the API
    }, [date])

    const changedDate = event => {
        //if user changes their selected date
        //nullify their chosen slot
        setChosenSlot(null);
        //reset to new date
        setDate(event.value);
    }

    const getTrainerId = () => {
        const {trainerId} = props.match.params;
        console.log(trainerId);
        return parseInt(trainerId);
    }

    let newSession = {
        trainer_id: getTrainerId(),
        trainee_id: parseInt(localStorage.getItem('id')),
        start_time: null,
        end_time: null,
        notes: "" 
    }

    const addSession = event => {
        let newSessionStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), chosenSlot.slice(0, 2) - 6);
        let textSessionStart = newSessionStart.toISOString().slice(0, 19).replace('T', ' ');

        let newSessionEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), chosenSlot.slice(8, 10) - 6)
        let textSessionEnd = newSessionEnd.toISOString().slice(0, 19).replace('T', ' ');

        newSession.start_time = textSessionStart;
        newSession.end_time = textSessionEnd;
        newSession.notes = notes;

        //need trainer ID and trainee ID
        //potentially pass trainer ID from when they click the book appointment button for that trainer
        //need to persist the userID in the browser
        repository.addASession(newSession);

        alert("supposed to add session");
    }


    return (
        <div>
            <div className="center">
                <div>
                    <h2 className="text-white">Book a Session</h2>
                    <Calendar value={ date } onChange={ event => changedDate(event) }></Calendar>
                    <h6 className="text-white">Selected Date: { date?.toDateString() }</h6>                    {
                        date && <h6 className="text-white">Selected Time: { chosenSlot }</h6>
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
            </div>
            <div className="center">
                {
                    chosenSlot && <form className="form-row">
                        <div className="col">
                            <label htmlFor="sessionNotes" className="m-3 align-top">Session Notes: </label>
                            <textarea id="sessionNotes" className="m-3"
                            onChange={event => setNotes(event.target.value)}></textarea>
                        </div>
                        <button className="btn btn-primary m-3" type="button" onClick={ event => addSession() }>Submit</button>
                    </form>
                }
            </div>
        </div>
    )
}