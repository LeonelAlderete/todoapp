import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";

export default function LoggedInRouter() {
  return (
    <Router>
      <Switch>
        {routes.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            exact={item.exact}
            render={(props) =>
              item.layout ? (
                <item.layout>
                  <item.component {...props} />
                </item.layout>
              ) : (
                <item.component {...props} />
              )
            }
          />
        ))}
      </Switch>
    </Router>
  );
}
