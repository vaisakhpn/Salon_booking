import jwt from "jsonwebtoken";

// auth middleware
const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token or wrong format:", authHeader);
      return res.status(401).json({
        success: false,
        message: "Not Authorized, no token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔐 Received token:", token);

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: token_decode.id };

    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

export default authUser;
