import React from "react";
import {Home} from "./Pages";
import {BrowserRouter, Switch, Route} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
