import React, { useState, useEffect } from "react";
import { selectPlan } from "../../actions/planActions";
import EventItem from "../events/EventItem";

const PlanDetails = (props) => {
  const { selectedPlan, fetchPlanById } = props;
  const { events } = selectedPlan;
  useEffect(() => {
    if (!selectPlan.length < 1) {
      let planId = window.location.href.split("/plan/")[1];
      fetchPlanById(planId);
    }
  }, [selectPlan]);
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
              return <EventItem event={event} />;
            })}
        </ul>
        <PlanDetailsDescription selectedPlan={selectedPlan} />
      </div>
    </>
  );
};

const PlanDetailsDescription = (props) => {
  const { selectedPlan } = props;
  const authorImgUrl = 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s320x320/119895961_109422004159755_5892309579145816227_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=EH5sUiWjhGoAX8TTFdi&oh=e03e563f99aa823a1b28f95276de255b&oe=5FB2150B';
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
        <div className="plan-details-description-card-buttons">
          <a className="plan-details-description-card-button-save plan-details-description-card-button">SAVE</a>
          <a className="plan-details-description-card-button-share plan-details-description-card-button">SHARE</a>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
