import React from 'react';

const PlanItem = (props) => {
    const { plan } = props;    
    return (
        <section className="plan-single">
            <img className="plan-single-thumbnail" src={plan.imgUrl} />
            <div className="plan-single-summary">{plan.summary}</div>
            <div className="plan-single-author">{plan.author}</div>
            <div className="plan-single-description">{plan.description}</div>
            <a className="plan-single-button" href={"/plan/" + plan._id}>
                SEE MORE
            </a>      
        </section>
    );
}

export default PlanItem;
