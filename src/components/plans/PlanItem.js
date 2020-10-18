import React, { useState, useEffect } from "react";
import axios from "axios";

const endpoint = "http://localhost:8000";

const PlanItem = (props) => {
  const { plan } = props;
  return (
    <li className="event-item-card">
      <div className="event-item-time">
        <img src={plan.imgUrl} className="plan-item-img" />
      </div>
      <div className="event-item-summary">{plan.summary}</div>
      <div className="event-item-location">
        <span className="event-item-icon">😏</span>
        <span className="event-item-location-text">{plan.author}</span>
      </div>
      <div className="event-item-description">
        <div className="event-item-description-text">{plan.description}</div>
      </div>
      <a href={"/plan/" + plan._id} className="event-item-button-save">
        SEE MORE
      </a>
    </li>
  );
};

export default PlanItem;
