import React, { useState, useEffect } from "react";
import axios from 'axios';
import { REFRESH_TOKEN, AUTH_CODE } from '../../types/authTypes';
import EventItem from "../events/EventItem";

const endpoint = "http://localhost:8000";

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
      <header
        // style={bgImgStyle}
        className="plan-details-header"
      ></header>
      <div className="plan-details-container">
        <ul className="plan-details-event-list event-list">
          <li className="plan-details-event-list-title">Schedule</li>
          {events &&
            events.map((event) => {
              return <EventItem 
              event={event}
              authCode={authCode}
              refreshToken={refreshToken}
              redirectUri={redirectUri}
              setAuthCode={setAuthCode}
              setRefreshToken={setRefreshToken}
              setRedirectUri={setRedirectUri}
              />;
            })}
        </ul>
        <PlanDetailsDescription
          selectedPlan={selectedPlan}
          authCode={authCode}
          refreshToken={refreshToken}
          redirectUri={redirectUri}
          setAuthCode={setAuthCode}
          setRefreshToken={setRefreshToken}
          setRedirectUri={setRedirectUri}
        />
      </div>
    </>
  );
};

const PlanDetailsDescription = (props) => {
  const {
    selectedPlan,
    authCode,
    refreshToken,
    redirectUri,
    setAuthCode,
    setRefreshToken,
    setRedirectUri
  } = props;

  const authorImgUrl = 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s320x320/119895961_109422004159755_5892309579145816227_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=EH5sUiWjhGoAX8TTFdi&oh=e03e563f99aa823a1b28f95276de255b&oe=5FB2150B';
  const {isSaved, setSaveStatus} = useState(null);

  useEffect(() => {
    if(!redirectUri) {
      setRedirectUri();
    }
  }, [redirectUri])

  return (
    <div className="plan-details-description">
      <h1 className="plan-details-description-summary">
        {selectedPlan.summary}
      </h1>
      <div className="plan-details-description-card">
        <div className="plan-details-description-card-title">Description</div>
        <div className="plan-details-description-card-author">
          <img src={authorImgUrl} className="plan-details-description-card-author-icon" />
          <div className="plan-details-description-card-author-info">
            <div className="plan-details-description-card-author-name">{selectedPlan.author}</div>
            <div className="plan-details-description-card-author-share-count">shared <span className="plan-details-description-card-author-share-count-marked">32</span> plans with us</div>
          </div>
        </div>
        <div className="plan-details-description-card-text">
          {selectedPlan.description}
        </div>
      </div>
    </div>
  );
};


export default PlanDetails;
