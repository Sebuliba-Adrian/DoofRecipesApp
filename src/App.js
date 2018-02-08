import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/authentication/registration';
import LoginPage from './components/authentication/login';

const App = () => (
  <BrowserRouter>
    <div>
    <Route path="/login" component={LoginPage} />
    <Route path="/registration" component={Registration} />
    </div>
  </BrowserRouter>
);

export default App;
export const APIUrl = 'http://localhost:5000/';
