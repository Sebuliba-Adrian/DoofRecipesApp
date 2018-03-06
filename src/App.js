import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./components/authentication/registration";
import LoginPage from "./components/authentication/login";
import Dashboard from "./components/dashboard";

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/registration" component={Registration} />
      <Route path="(/|/login)" component={LoginPage} />
      <Route path="(/dashboard)" component={Dashboard} />
    </div>
  </BrowserRouter>
);

export default App;
export const APIUrl = "http://localhost:5000/";
