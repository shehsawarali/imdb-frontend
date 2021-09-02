import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";

import { UserContext } from "context/UserContext";

const StrictlyPublic = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user)
          return (
            <Redirect to={{ pathname: "/profile", state: { from: props.location } }} />
          );

        return <Component {...props} />;
      }}
    />
  );
};

const StrictlyPrivate = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user)
          return (
            <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
          );

        return <Component {...props} />;
      }}
    />
  );
};

export { StrictlyPublic, StrictlyPrivate };
