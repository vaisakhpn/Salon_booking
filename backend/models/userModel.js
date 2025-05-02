import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String,  unique: true, default: "0000000000" },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png",
  },
});

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
