import React, { useState, useEffect } from "react";
import EventList from "../event/EventList";

const sampleProfilePic = 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-19/s150x150/64988710_325083291736712_3498367569738334208_n.jpg?_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_ohc=gb4rRJ3MFn0AX_deNT3&tp=1&oh=f7df0781eb742e491ee9ae6adc3178b9&oe=5FF605E1';

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

  const bgImg = {
    backgroundImage: `url(${selectedPlan.imgUrl})`,
  };

  return (
    <div className="plan-details" style={bgImg}>
      <h1 className="plan-details-title">{selectedPlan.summary}</h1>
      <section className="plan-details-card">
        <h2 className="plan-details-description-title">Description</h2>
        <div className="plan-details-user">
          <img src={sampleProfilePic} alt={selectedPlan.author} className="plan-details-user-profile" />
          <div className="plan-details-user-info">
            <div className="plan-details-user-info-name">{selectedPlan.author}</div>
            <div className="plan-details-user-info-sharecount">
              shared
              <span class="plan-details-user-info-sharecount-bold">32</span>
              plans with us
            </div>
          </div>
        </div>
        <div className="plan-details-description-text">{selectedPlan.description}</div>
        <div className="plan-details-action-buttons">
          <a className="plan-details-action-button-saveall plan-details-action-button">
            SAVE ALL
          </a>
          <a className="plan-details-action-button-share plan-details-action-button">
            SHARE
          </a>
        </div>
      </section>
      <section className="plan-details-schedule">
        <h2 className="plan-details-schedule-title">Schedule</h2>
        {/* events below */}
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
      </section>
    </div>
  );
};

export default PlanDetails;
