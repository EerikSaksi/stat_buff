import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Content from "./content";
import { createBrowserHistory } from "history";
const App: React.FC = () => (
  <Router history = {createBrowserHistory()}>
    <Switch>
      <Route path="/ethics/:username">
        <Content />
      </Route>
    </Switch>
  </Router>
);

export default App;
