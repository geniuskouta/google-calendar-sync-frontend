import { ALL_PLAN, SINGLE_PLAN, SELECT_PLAN } from "../types/planTypes";
import * as GoogleCalendar from "../api/GoogleCalendar";

export const fetchPlans = () => {
    return (dispatch, getState) => {
        GoogleCalendar.getPlans().then(fetchedPlans => {
          return dispatch({ type: ALL_PLAN, plans: fetchedPlans });
        })
        .catch((err) => {
          console.log(err);
        });
    };
}

export const fetchPlanById = (planId) => {
    return (dispatch, getState) => {
      GoogleCalendar.getPlanById(planId).then(fetchedPlan => {
        return dispatch({ type: SINGLE_PLAN, selectedPlan: fetchedPlan });
      })
      .catch((err) => {
        console.log(err);
      });
    }
}
