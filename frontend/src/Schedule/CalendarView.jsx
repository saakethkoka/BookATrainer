import React, {Component} from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from 'daypilot-pro-react';
import "./CalendarView.css"
import { AppointmentForm } from "./AppointmentForm";


class CalendarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "Week",
            durationBarVisible: false,
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: async args => {
                const dp = this.calendar;
                const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
                dp.clearSelection();
                if (!modal.result) { return; }
                dp.events.add({
                    start: args.start,
                    end: args.end,
                    id: DayPilot.guid(),
                    text: modal.result
                });
            },
            eventDeleteHandling: "Update",
            onEventClick: async args => {
                const dp = this.calendar;
                const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
                if (!modal.result) { return; }
                const e = args.e;
                e.data.text = modal.result;
                dp.events.update(e);
            },
        };
    }

    componentDidMount() {
        this.setState({
            startDate: "2021-10-11",
            events: [
                {
                    id: 1,
                    text: "Event 1",
                    start: "2021-10-11T10:30:00",
                    end: "2021-10-11T13:00:00"
                },
            ]
        });
    }

    render() {
        var {...config} = this.state;
        return (
            <div className="container mx-0">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="wrap">
                            <div className="left">
                                <DayPilotNavigator 
                                    selectMode={"week"}
                                    showMonths={3}
                                    skipMonths={3}
                                    onTimeRangeSelected={ selected => {
                                    this.setState({
                                        startDate: selected.day
                                    });
                                }}/>
                            </div>
                        <div className="main">
                            <DayPilotCalendar
                                {...config}
                                ref={component => {
                                this.calendar = component && component.control;
                                }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    <AppointmentForm></AppointmentForm>
                    </div>
                </div>
            </div>
        )
    }
}

export default CalendarView;