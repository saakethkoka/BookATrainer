import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Calendar } from '@progress/kendo-react-dateinputs';
import React, { useEffect, useState} from "react";

export const KendoCalendarTrainer = props => {
    const [date, setDate] = useState(null);
    const [chosenSlot, setChosenSlot] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);

    //choose a date
    //make time slots for that date
    //make submit button to submit times for that date
    useEffect(() => {
        //
    }, [date])

    const changedDate = event => {
        //reset to new date
        setDate(event.value);
        //reset times
        setTimeSlots([]);
    }


    return (
        <>
        <div>
            <h2 className="text-white">Create Your Schedule</h2>
            <Calendar value={ date } onChange={ event => changedDate(event) }></Calendar>
            <h6 className="text-white">Selected Date: { date?.toDateString() }</h6>
            {
                date && <h6 className="text-white">Selected Time: { chosenSlot }</h6>

            }
        </div>
        <div>
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
                chosenSlot && <form className="form-row">
                    <div className="col">
                        <label for="sessionNotes" className="m-3 align-top">Session Notes: </label>
                        <textarea id="sessionNotes" className="m-3"></textarea>
                    </div>
                    <button className="btn btn-primary m-3" type="button">Submit</button>
                </form>
            }
        </div>
        </>
    )
}
