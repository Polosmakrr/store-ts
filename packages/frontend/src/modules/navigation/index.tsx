import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageContainer from '../home';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route component={HomePageContainer} path="/" />
    </Switch>
  </Router>
);
