import React, { useState } from "react";
import EventItem from "./EventItem";

const EventList = (props) => {
  const {
    events,
    authCode,
    refreshToken,
    redirectUri,
    setAuthCode,
    setRefreshToken,
    setRedirectUri,
  } = props;

  return (
    <ul className="event-collection">
      {events &&
        events.map((event) => {
          // use plan id to save an event
          return (
            <EventItem
              key={event._id}
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
