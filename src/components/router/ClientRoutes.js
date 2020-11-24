import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import AuthRedirect from "../auth/AuthRedirect";

import PlanList from "../plan/PlanList";
import PlanDetails from "../plan/PlanDetails";

function ClientRoutes(props) {
  const { authCode, setAuthCode } = props;
  
  return (
    <Switch>
      <Route path="/plans">
        <PlanList {...props} />
      </Route>
      <Route path="/plan/:id">
        <PlanDetails {...props} />
      </Route>
      <Route path="/authenticate">
        <AuthRedirect
        authCode={authCode}
        setAuthCode={setAuthCode}
        />
      </Route>
    </Switch>
  );
}

export default ClientRoutes;
