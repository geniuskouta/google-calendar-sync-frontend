import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EventItem from './EventItem';

const endpoint = "http://localhost:8000";

const EventList = () => {
    const [events, setEvents] = useState();
    const [credentials, setCredentials] = useState(null);
    useEffect(() => {
        if(!events) {
            fetchEvents();
        }
        console.log(events);
      }, [events]);

    const fetchEvents = async () => {
        axios.get(`${endpoint}`).then(response => {
            setEvents(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <ul className="event-list">
            {
                events && events.map(event => {
                    return <EventItem event={event}
                        credentials={credentials}
                        setCredentials={setCredentials}
                    />
                })
            }
        </ul>
    )
}

export default EventList;