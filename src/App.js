import React from "react";

import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import {Navbar} from "./Components";
import {ActivateAccount, Home, SignIn, SignUp} from "./Pages";
import {StrictlyPublic} from "./Routing";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <StrictlyPublic path="/signin" component={SignIn} />
        <StrictlyPublic path="/signup" component={SignUp} />
        <StrictlyPublic path="/verify" component={ActivateAccount} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
