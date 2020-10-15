import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';

const EventList = (props) => {
    console.log(props);
    const { events, fetchEvents } = props;
    const { credentials, setCredentials } = useState(null);
    useEffect(() => {
        if(!events) {
            fetchEvents();
        }
        console.log(events);
    }, [events]);

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
