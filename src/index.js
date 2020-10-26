import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import "./assets/scss/index.scss";
import * as serviceWorker from './serviceWorker';

import { Provider, connect } from "react-redux";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { authReducer } from './reducers/authReducer';
import { eventReducer } from './reducers/eventReducer';
import { planReducer } from './reducers/planReducer';

import { setRefreshToken, setAuthCode, setRedirectUri } from './actions/authActions';
import { fetchEvents } from './actions/eventActions';
import { fetchPlans, fetchPlanById } from './actions/planActions';

const rootReducer = combineReducers({
  authReducer: authReducer,
  eventReducer: eventReducer,
  planReducer: planReducer
});

const Store = createStore(rootReducer, applyMiddleware(logger, thunk));

const mapDispatchToProps = (dispatch) => { 
  return {
    setAuthCode: () => dispatch(setAuthCode()),
    setRefreshToken: (refreshToken) => dispatch(setRefreshToken(refreshToken)),
    setRedirectUri: () => dispatch(setRedirectUri()),
    fetchEvents: () => dispatch(fetchEvents()),
    fetchPlans: () => dispatch(fetchPlans()),
    fetchPlanById: (_id) => dispatch(fetchPlanById(_id)),
  };
};

const mapStateToProps = (state) => { 
  return {
    authCode: state.authReducer.authCode,
    refreshToken: state.authReducer.refreshToken,
    redirectUri: state.authReducer.redirectUri,

    events: state.eventReducer.events,
    selectedEvent: state.eventReducer.selectedEvent,

    plans: state.planReducer.plans,
    selectedPlan: state.planReducer.selectedPlan,
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
