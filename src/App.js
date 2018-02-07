import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './components/authentication/registration';

const App = () => (
  <BrowserRouter>
    <Route path="/registration" component={Registration} />
  </BrowserRouter>
);

export default App;
export const APIUrl = 'http://localhost:5000/';
