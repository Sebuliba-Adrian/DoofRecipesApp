import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/authentication/registration';
import LoginPage from './components/authentication/login';
import Categories from './components/categories/categories';
import Dashboard from './components/dashboard'

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="(/|/login)" component={LoginPage} />
      <Route path="/registration" component={Registration} />
      <Route path="/dashboard" component={Dashboard} />
      {/* <Route path="/" component={Dashboard} /> */}
    </div>
  </BrowserRouter>
);

export default App;
export const APIUrl = 'http://localhost:5000/';
