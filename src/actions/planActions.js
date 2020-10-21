import { CREATE_PLAN, ALL_PLAN, SELECT_PLAN, SINGLE_PLAN } from "../types/planTypes";


import axios from 'axios';
const endpoint = "http://localhost:8000";

export const fetchPlans = () => {
    return (dispatch, getState) => {
        const { plans } = getState().planReducer;
        axios
        .get(`${endpoint}/plans`)
        .then((response) => {
          return dispatch({ type: ALL_PLAN, plans: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    };
}

export const fetchPlanById = (planId) => {
    return (dispatch, getState) => {
        axios
        .get(`${endpoint}/plan/${planId}`)
        .then((response) => {
            console.log(response.data);
          return dispatch({ type: SINGLE_PLAN, selectedPlan: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
}

export const savePlanById = (planId) => {

}

export const selectPlan = (planId) => {
    return (dispatch, getState) => {
        const { plans } = getState().planReducer;
        const selectedPlan = plans.filter(plan => {
            return plan._id == planId;
        });
        console.log('ypp', selectedPlan);
        console.log(planId);
        dispatch({ type: SELECT_PLAN, selectedPlan });
    }
}