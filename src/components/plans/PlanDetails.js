import React, { useState, useEffect } from "react";
import { selectPlan } from "../../actions/planActions";
import EventItem from '../events/EventItem';
import PlanItem from './PlanItem';

const PlanDetails = (props) => {
  const { selectedPlan, fetchPlanById } = props;
  const { events } = selectedPlan;

  const bgImgStyle = {
    backgroundImage: `url(${selectedPlan.imgUrl})`,
  };

  useEffect(() => {
    if(!selectPlan.length < 1) {
      let planId = window.location.href.split("/plan/")[1];
      fetchPlanById(planId);
    }
  }, [selectPlan]);
  return (
    <>
        <header
        // style={bgImgStyle} 
        className="plan-details-header">
          <h1 className="plan-details-summary">{selectedPlan.summary}</h1>
        </header>
        <div className="plan-details-container">
          <ul className="plan-details-event-list event-list">
              {
                  events && events.map(event => {
                      return <EventItem
                      className="plan-details-event-item"
                      event={event} />
                  })
              }
          </ul>
        </div>
    </>
  );
};


export default PlanDetails;
