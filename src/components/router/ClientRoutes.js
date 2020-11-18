import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthRedirect from "../auth/AuthRedirect";
import PlanList from "../plan/PlanList";

function ClientRoutes(props) {

  const RedirectAfterAuthenticated = (props) => {
    return <Redirect to={props.uri} />
  }

  return (
    <Switch>
      <Route path="/plans">
        <PlanList {...props} />
      </Route>
      <Route path="/plan">
        
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
