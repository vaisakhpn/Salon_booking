import { GoogleLogin } from "@react-oauth/google";

import { useContext } from "react";

import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Oauth = () => {
  const { handleGoogleLogin } = useContext(AppContext);

  return (
    <div className="flex flex-col m-auto items-center mt-2">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => toast.error("Login Failed")}
      />
    </div>
  );
};

export default Oauth;
