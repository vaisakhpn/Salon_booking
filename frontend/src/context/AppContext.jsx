import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [shops, setShops] = useState([]);
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("token");
    return stored && stored !== "false" ? stored : null;
  });

  const [userData, setUserData] = useState(false);
  const [loadingShops, setLoadingShops] = useState(true);
  const navigate = useNavigate();

  const getShopData = async () => {
    try {
      setLoadingShops(true);
      const { data } = await axios.get(backendUrl + "/api/shop/list");
      if (data.success) {
        setShops(data.shops);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingShops(false);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(" Error loading profile:", error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async (googleResponse) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/google-login`, {
        token: googleResponse.credential,
      });

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Login failed: No token");
      }
    } catch (err) {
      console.error(" Google login failed:", err);
      toast.error("Google login failed");
    }
  };

  const value = {
    shops,
    getShopData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    loadingShops,
    userData,
    setUserData,
    loadUserProfileData,
    handleGoogleLogin,
  };

  useEffect(() => {
    getShopData();
  }, []);

  useEffect(() => {
    if (token && token !== "false") {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
