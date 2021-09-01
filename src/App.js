import React from "react";

import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import {Navbar} from "./components";
import {ActivateAccount, Home, SignIn, SignUp} from "./pages";
import {StrictlyPublic} from "./routing";

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
