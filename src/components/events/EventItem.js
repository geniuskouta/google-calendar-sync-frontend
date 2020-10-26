import React, { useState, useEffect } from "react";
import axios from "axios";
import { REFRESH_TOKEN, AUTH_CODE } from "../../types/authTypes";

const endpoint = "http://localhost:8000";

const EventItem = (props) => {
  const [time, setTime] = useState(null);
  const [isSaved, setSaveStatus] = useState(null);
  const {
    event,
    authCode,
    refreshToken,
    setAuthCode,
    setRefreshToken,
    redirectUri,
    setRedirectUri,
  } = props;

  useEffect(() => {
    if (!redirectUri) {
      setRedirectUri();
    }

    if (!time) {
      const startTime = getHoursFromISO(event.startTime);
      const endTime = getHoursFromISO(event.endTime);
      setTime({
        startTime,
        endTime,
      });
    }
  }, [redirectUri, refreshToken, event.startTime, event.endTime, time]);

  const getHoursFromISO = (ISO) => {
    const time = ISO.split("T")[1].slice(0, 5); // get only hours and minutes
    return time;
  };

  const saveEventOnCalendar = async () => {
    if (!authCode && !refreshToken) {
      return await axios
        .post(`${endpoint}/event/save`, {
          credentials: {
            type: null,
            token: null,
            redirectUri: redirectUri,
          },
        })
        .then((response) => {
          if (typeof response.data === "string") {
            return (window.location.href = response.data); //auth url
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .post(`${endpoint}/event/save`, {
        eventId: event._id,
        startTime: event.startTime,
        endTime: event.endTime,
        summary: event.summary,
        location: event.location,
        description: event.description,
        credentials: {
          type: refreshToken ? REFRESH_TOKEN : AUTH_CODE,
          token: refreshToken || authCode,
          redirectUri: redirectUri,
        },
      })
      .then((response) => {
        if (response.data.refreshToken) {
          setSaveStatus(true);
          setRefreshToken(response.data.refreshToken);
          return;
        }
      })
      .catch((err) => {
        setAuthCode(null);
        setRefreshToken(null);
      });
  };

  const EventSaveButton = (props) => {
    const { isSaved } = props;
    return isSaved ? (
      <span className="event-item-button-saved">SAVED!</span>
    ) : (
      <a className="event-item-button-save" onClick={saveEventOnCalendar}>
        SAVE
      </a>
    );
  };

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
      <EventSaveButton isSaved={isSaved} />
    </li>
  ) : null;
};

export default EventItem;
