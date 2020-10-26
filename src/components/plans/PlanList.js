import React, { useEffect } from "react";
import axios from "axios";
import PlanItem from "./PlanItem";

const endpoint = "http://localhost:8000";

const PlanList = (props) => {
  const { plans, fetchPlans, selectPlan } = props;
  useEffect(() => {
    if (!plans) {
      fetchPlans();
      console.log(plans);
    }
  }, [plans]);

  return (
    <ul className="plan-list event-list">
      {plans &&
        plans.map((plan) => {
          return <PlanItem plan={plan} selectPlan={selectPlan} />;
        })}
    </ul>
  );
};

export default PlanList;
