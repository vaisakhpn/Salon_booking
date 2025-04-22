import { createContext } from "react";
import { shops } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const value = {
    shops,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
