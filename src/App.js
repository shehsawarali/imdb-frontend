import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "components";
import Pages from "pages";
import { StrictlyPublic } from "routing";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <StrictlyPublic path="/signin" component={Pages.SignIn} />
        <StrictlyPublic path="/signup" component={Pages.SignUp} />
        <StrictlyPublic path="/verify" component={Pages.VerifyAccount} />
        <StrictlyPublic path="/forgot-password" component={Pages.ForgotPassword} />
        <StrictlyPublic path="/reset" component={Pages.ResetPassword} />

        <Route exact path="/" component={Pages.Home} />
        <Route path="/user/:id" component={Pages.Profile} />
        <Route path="/404" component={Pages.NotFound} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
