import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import Success from './success'
const UrlRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:username">
        <App/>
      </Route>
      <Route path="/success">
        <Success/>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default UrlRouter;
