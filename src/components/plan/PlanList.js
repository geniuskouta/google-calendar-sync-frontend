import React, { useEffect } from 'react';
import PlanItem from "./PlanItem";

const PlanList = (props) => {
    const { plans, fetchPlans } = props;

    useEffect(() => {
        if (!plans) {
          fetchPlans();
          console.log(plans);
        }
      }, [plans]);
    
    return (
        <>
            {plans && plans.map(plan => {
              // use plan id to save an event
              return <PlanItem
              key={plan._id}
              plan={plan} />;
            })}
        </>
    );
}

export default PlanList;
