import { SAVE_EVENT, ALL_EVENT, SINGLE_EVENT } from "../types/eventTypes";

const initialState = {
  events: null,
  selectedEvent: {
    _id: null,
    event: [],
    author: '',
    summary: '',
    description: '',
    imgUrl: ''
  },
};

export const eventReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ALL_EVENT:
      newState.events = action.events;
      return newState;
    case SINGLE_EVENT:
      newState.selectedEvent = action.selectedEvent;
      return newState;
    case SAVE_EVENT:
      newState.events = action.events;
      return newState;
    default:
      return newState;
  }
};
