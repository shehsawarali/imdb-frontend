import React from "react";
import {Home} from "./Pages";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Navbar} from "./Components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
