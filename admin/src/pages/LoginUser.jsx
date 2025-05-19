import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const LoginUser = () => {
  const [state, setState] = useState("Shop");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setSToken } = useContext(ShopContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(false);
    try {
      if (state === "Admin") {
        setLoading(true);
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      } else {
        setLoading(true);
        const { data } = await axios.post(backendUrl + "/api/shop/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("sToken", data.token);
          setSToken(data.token);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl gap-3 font-semibold m-auto">
          <span className="text-blue-500"> {state} </span>
          Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button
          disabled={loading}
          className="bg-blue-500 text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Shop Login?
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setState("Shop")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginUser;
