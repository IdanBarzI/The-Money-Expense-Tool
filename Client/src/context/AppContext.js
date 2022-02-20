import React from "react";
import useStickyState from "../hooks/use-sticky-state";

const AppContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const AppContextProvider = (props) => {
  const [user, setUser] = useStickyState(null, "user");

  return (
    <AppContext.Provider
      value={{
        user,
        setUser: setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
