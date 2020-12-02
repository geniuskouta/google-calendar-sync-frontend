import React, { useState, useEffect } from "react";
import EventList from "../event/EventList";

const PlanDetails = (props) => {
  const {
    selectedPlan,
    fetchPlanById,
    authCode,
    refreshToken,
    redirectUri,
    setAuthCode,
    setRefreshToken,
    setRedirectUri,
  } = props;
  const { events } = selectedPlan;
  useEffect(() => {
    if (!selectedPlan._id) {
      let planId = window.location.href.split("/plan/")[1];
      fetchPlanById(planId);
    }
  }, [selectedPlan]);
  return (
    <>
      {events && (
        <EventList
          events={events}
          authCode={authCode}
          refreshToken={refreshToken}
          redirectUri={redirectUri}
          setAuthCode={setAuthCode}
          setRefreshToken={setRefreshToken}
          setRedirectUri={setRedirectUri}
        />
      )}
    </>
  );
};

export default PlanDetails;
