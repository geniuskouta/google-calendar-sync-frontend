import { SAVE_EVENT, ALL_EVENT, SINGLE_EVENT } from "../types/eventTypes";

import axios from 'axios';
const endpoint = "http://localhost:8000";

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const { events } = getState().eventReducer;
        axios.get(`${endpoint}/events`).then(response => {
            dispatch({ type: ALL_EVENT, events: response.data });
        }).catch(err => {
            console.log(err);
        });
    };
}
