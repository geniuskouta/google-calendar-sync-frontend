import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getAuthUrl, saveEventOnCalendar } from "../../api/GoogleCalendar";
import { REFRESH_TOKEN, AUTH_CODE } from "../../types/authTypes";

const EventItem = (props) => {
  const {
    event,
    authCode,
    refreshToken,
    setAuthCode,
    setRefreshToken,
    redirectUri,
    setRedirectUri,
  } = props;

  /*
  * time / setTime handles event time string
  * isSaved handles the state of whether the event is saved on calendar
  */
  const [time, setTime] = useState(null);
  const [isSaved, setSaveStatus] = useState(null)

  useEffect(() => {
    if (!redirectUri) {
      setRedirectUri();
    }
    console.log('yaaa');
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

  const saveEvent = async (e) => {
    e.preventDefault();
    if (!authCode && !refreshToken) {
      /*
      * Users will be redirected to the google login screen
      */
      const authUrl = await getAuthUrl(redirectUri);
      window.location.href = authUrl;
      return ;
    }

    const token = await saveEventOnCalendar(
        event,
        refreshToken ? REFRESH_TOKEN : AUTH_CODE,
        refreshToken || authCode,
        redirectUri
      );
      setRefreshToken(token);
      setSaveStatus(true);
  };

  const EventSaveButton = (props) => {
    const { isSaved } = props;
    return isSaved ? (
      <span className="event-single-action-button-saved event-single-action-button">SAVED!</span>
    ) : (
      <a className="event-single-action-button-save event-single-action-button" onClick={saveEvent}>
        SAVE
      </a>
    );
  };

  const EventTime = (props) => {
    const { time } = props;
    return time ? (
    <div className="event-single-time">{time.startTime} - {time.endTime}</div>
    ) : (
      <div className="event-single-time">--:-- - --:--</div>
    );
  }

  return (
    (
      <li className="event-single">
        <EventTime time={time} />
        <div className="event-single-summary">{event.summary}</div>
        <div className="event-single-location">{event.location}</div>
        <div className="event-single-description">{event.description}</div>
        <EventSaveButton isSaved={isSaved} />
      </li>
    )
  );
};

export default EventItem;
