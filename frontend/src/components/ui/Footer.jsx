import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src="logo" alt="LOGO" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            About company
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </li>
            <li onClick={() => navigate("/about")} className="cursor-pointer">
              About Us
            </li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer">
              Contact Us
            </li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 7559092281</li>
            <li>vaisakhpn78@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p>Copyright 2025.All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
