import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import App from "./App";
const UrlRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/ethics/:username">
        <App/>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default UrlRouter;
