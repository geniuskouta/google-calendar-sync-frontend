import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ClientRoutes from './ClientRoutes';

function MainNavigation(props) {
  return (
    <Router>    
        <ClientRoutes {...props} />
    </Router>
  );
}

export default MainNavigation;
