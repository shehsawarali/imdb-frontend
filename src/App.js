import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "components";
import Pages from "pages";
import { StrictlyPrivate, StrictlyPublic } from "routing";

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

        <StrictlyPrivate path="/watchlist" component={Pages.Watchlist} />
        <StrictlyPrivate path="/favorites" component={Pages.Favorites} />

        <Route exact path="/" component={Pages.Home} />
        <Route path="/user/:id" component={Pages.Profile} />
        <Route path="/404" component={Pages.NotFound} />
        <Route path="/title/:id/reviews" component={Pages.TitleReviews} />
        <Route path="/title/:id" component={Pages.Title} />
        <Route path="/person/:id" component={Pages.Person} />
        <Route path="/search/title" component={Pages.TitleSearch} />
        <Route path="/search/person" component={Pages.PersonSearch} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
