import { createContext } from "react";
import { shops } from "../assets/assets";

export const AppContext = createContext();

const currencySymbol = "₹";

const AppContextProvider = (props) => {
  const value = {
    shops,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
