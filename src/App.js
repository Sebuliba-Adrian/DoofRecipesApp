import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from './components/authentication/registration';
import LoginPage from './components/authentication/login';
import Dashboard from './components/dashboard';
import LostPage from './components/lostPage';
import How from './components/how';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/registration" component={Registration} />
      <Route path="(/|/login)" exact component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/instructions" component={How} />
      <Route path="*" component={LostPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
export const APIUrl = 'https://doofrecipeapi.herokuapp.com/';
