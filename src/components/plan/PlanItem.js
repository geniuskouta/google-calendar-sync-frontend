import React from 'react';

const PlanItem = (props) => {
    const { plan } = props;    

    return (
        <>
            <div>{plan.summary}</div>
            <a href={"/plan/" + plan._id} >see more</a>            
        </>
    );
}

export default PlanItem;
