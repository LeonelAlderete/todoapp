import React from "react";
//Utils
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Rutas
import routes from "./routes";

export default function UnloggedRouter() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} />}
          />
        ))}
      </Switch>
    </Router>
  );
}
