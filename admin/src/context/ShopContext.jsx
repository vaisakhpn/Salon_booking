import { createContext, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [sToken, setSToken] = useState(
    localStorage.getItem("sToken") ? localStorage.getItem("sToken") : ""
  );

  const value = {
    sToken,
    setSToken,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
