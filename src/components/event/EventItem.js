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
  const [time, setTime] = useState(null);

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
  };

  return (
    (
      <>
        <div>{event.summary}</div>
        <div>{event._id}</div>
        <a onClick={saveEvent}>
          SAVE
        </a>
      </>
    )
  );
};

export default EventItem;
