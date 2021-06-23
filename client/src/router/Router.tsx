import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";
import Home from "../pages/Home/Home";

function Router(): JSX.Element {
  return (
    <div className="router">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/dashboard" component={Home} />
      </Switch>
    </div>
  );
}

export default Router;
