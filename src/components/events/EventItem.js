import React, { useState, useEffect } from "react";
import axios from 'axios';

const REFRESH_TOKEN = 'REFRESH_TOKEN';
const CODE = 'CODE';

const endpoint = "http://localhost:8000";

const EventItem = (props) => {
  const { credentials, setCredentials } = props;
  const [time, setTime] = useState(null);
  const { event } = props;

  useEffect(() => {
    if(!credentials) {
      let code = decodeURIComponent(window.location.search);
      if(code.length > 0) {
        code = code.split('code=')[1].split('&')[0];
        setCredentials({type: CODE, token: code});
      }
    }

    if (!time) {
      const startTime = getHoursFromISO(event.startTime);
      const endTime = getHoursFromISO(event.endTime);
      setTime({
        startTime,
        endTime,
      });
    }
  }, [credentials, event.startTime, event.endTime, time]);

  const getHoursFromISO = (ISO) => {
    const time = ISO.split("T")[1].slice(0, 5); // get only hours and minutes
    return time;
  };

  const saveEventOnCalendar = async () => {
    !credentials ? axios.post(`${endpoint}/save`, {})
    .then((response) => {
        if(typeof(response.data) === 'string') {
          return window.location.href = response.data; //auth url
        }
    }).catch(err => {
        console.log(err);
    }) :
    axios.post(`${endpoint}/save`, {
      eventId: event._id,
      type: credentials.type,
      token: credentials.token
    }).then(response => {
      const { refreshToken } = response.data;
      if(refreshToken) {
        setCredentials({ type: REFRESH_TOKEN, token: refreshToken });
      }
      return ;
    }).catch(err => {
      console.log(err);
    });
  }

  return time ? (
    <li className="event-item-card">
      <div className="event-item-time">
        {time.startTime} - {time.endTime}
      </div>
      <div className="event-item-summary">{event.summary}</div>
      <div className="event-item-location">
        <span className="event-item-icon">📍</span>
        <span className="event-item-location-text">{event.location}</span>
      </div>
      <div className="event-item-description">
        <div className="event-item-description-text">{event.description}</div>
      </div>
      <a className="event-item-button-save" onClick={saveEventOnCalendar}>SAVE</a>
    </li>
  ) : null;
};

export default EventItem;
