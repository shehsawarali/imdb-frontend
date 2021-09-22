import React, { createContext, useEffect, useState } from "react";

import { ACCESS_TOKEN } from "constant";
import UserService from "services/UserService";

const UserContext = createContext();

const ContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      UserService.verifySession()
        .then((response) => {
          setUser(response.user);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          localStorage.removeItem(ACCESS_TOKEN);
        });
    } else setIsLoading(false);
  }, []);

  return (
    <div>
      {!isLoading && (
        <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
      )}
    </div>
  );
};

export default ContextWrapper;
export { UserContext };
