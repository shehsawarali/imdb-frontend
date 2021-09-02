import React, { createContext, useEffect, useState } from "react";

import UserService from "services/UserService";

const UserContext = createContext();

const ContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      UserService.verifySession()
        .then((response) => {
          setUser(response.user);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
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
