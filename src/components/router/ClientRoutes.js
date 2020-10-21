import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import EventList from "../events/EventList";
import PlanList from "../plans/PlanList";
import PlanDetails from "../plans/PlanDetails";
import AuthRedirect from "../auth/AuthRedirect";

function ClientRoutes(props) {

  const RedirectAfterAuthenticated = () => {
    let uri = decodeURIComponent(window.location.search);
    uri = uri.split("?state=")[1].split("&")[0];
    console.log(uri);
    return <Redirect to={uri} />
  }

  return (
    <Switch>
      <Route path="/events">
        <EventList {...props} />
      </Route>
      <Route path="/event"></Route>
      <Route path="/plans">
        <PlanList {...props} />
      </Route>
      <Route path="/plan">
        <PlanDetails {...props} />
      </Route>
      <Route path="/authenticate">
        <AuthRedirect {...props}
        RedirectAfterAuthenticated={RedirectAfterAuthenticated}
        />
      </Route>
    </Switch>
  );
}

export default ClientRoutes;
