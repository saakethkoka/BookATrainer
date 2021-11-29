import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Calendar } from '@progress/kendo-react-dateinputs';
import React, { useEffect, useState} from "react";

const KendoCalendar = props => {
    const [date, setDate] = useState(null);
    const [chosenSlot, setChosenSlot] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);

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


    return (
        <>
        <div>
            <h2 className="text-white">Book a Session</h2>
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

export default KendoCalendar;