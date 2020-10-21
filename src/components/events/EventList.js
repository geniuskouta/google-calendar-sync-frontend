import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";

const EventList = (props) => {
  console.log(props);
  const {
    events,
    fetchEvents,
    authCode,
    refreshToken,
    redirectUri,
    setAuthCode,
    setRefreshToken,
    setRedirectUri,
  } = props;
  useEffect(() => {
    if (!events) {
      fetchEvents();
    }
    console.log(events);
  }, [events]);

  return (
    <ul className="event-list">
      {events &&
        events.map((event) => {
          return (
            <EventItem
              event={event}
              authCode={authCode}
              refreshToken={refreshToken}
              redirectUri={redirectUri}
              setAuthCode={setAuthCode}
              setRefreshToken={setRefreshToken}
              setRedirectUri={setRedirectUri}
            />
          );
        })}
    </ul>
  );
};

export default EventList;
