import React, {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export default ({children}) => {
  const [user, setUser] = useState(null); //User information
  const [isLoaded, setIsLoaded] = useState(false); //Is the context loaded

  useEffect(() => {
    console.log(user);
    setIsLoaded(true);
  }, []);

  return (
    <div>
      {isLoaded && (
        <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
      )}
    </div>
  );
};
