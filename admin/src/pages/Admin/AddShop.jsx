import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddShop = () => {
  const [shopImg, setShopImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(false);
    try {
      if (!shopImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();

      formData.append("image", shopImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", Number(phone));
      formData.append("password", password);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      //consloe formdata
      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-shop",
        formData,
        { headers: { aToken } }
      );
      setLoading(false);
      if (data.success) {
        toast.success(data.message);
        setShopImg(false);
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setFees("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Shop</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={shopImg ? URL.createObjectURL(shopImg) : assets.upload_area}
              alt="shop"
            />
          </label>
          <input
            onChange={(e) => setShopImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload shop <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Shop Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Shop email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Phone Number </p>
              <input
                onWheel={(e) => e.target.blur()}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="phone number"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Shop password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onWheel={(e) => e.target.blur()}
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fees"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Shop</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="write about shop"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 px-10 py-3 mt-4 rounded-full text-white disabled:opacity-80 hover:opacity-95 "
        >
          {loading ? "Adding.." : "Add shop"}
        </button>
      </div>
    </form>
  );
};

export default AddShop;
