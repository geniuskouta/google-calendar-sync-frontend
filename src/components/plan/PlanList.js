import React, { useEffect } from 'react';

const PlanList = (props) => {
    const { plans, fetchPlans } = props;

    useEffect(() => {
        if (!plans) {
          fetchPlans();
          console.log(plans);
        }
      }, [plans]);
    
    return (
        <div>
            plans
        </div>
    );
}

export default PlanList;