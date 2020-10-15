import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import EventList from "../events/EventList";
import PlanList from "../plans/PlanList";
import PlanDetails from "../plans/PlanDetails";

function ClientRoutes(props) {
  return (
    <Switch>
      <Route path="/events">
        <EventList {...props} />
      </Route>
      <Route path="/event"></Route>
      <Route path="/plans">
        <PlanList {...props} />
      </Route>
      <Route path="/plan/:id">
        <PlanDetails {...props} />
      </Route>
    </Switch>
  );
}

export default ClientRoutes;
