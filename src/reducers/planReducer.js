import { SAVE_PLAN, ALL_PLAN, SELECT_PLAN, SINGLE_PLAN } from "../types/planTypes";

const initialState = {
  plans: null,
  selectedPlan: {
    _id: null,
    events: [],
    author: '',
    summary: '',
    description: '',
    imgUrl: ''
  },
};

export const planReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ALL_PLAN:
      newState.plans = action.plans;
      return newState;
    case SINGLE_PLAN:
      newState.selectedPlan = action.selectedPlan;
      return newState;
    case SELECT_PLAN:
        newState.selectedPlan = action.selectedPlan;
        return newState;
    case SAVE_PLAN:
      newState.plans = action.plans;
      return newState;
    default:
      return newState;
  }
};
