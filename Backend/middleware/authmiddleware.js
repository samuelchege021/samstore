import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      req.user = await User.findById(decoded.id).select("-password"); // Get user data

      next();
    } catch (error) {
      console.error("Auth Error:", error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); // ✅ If user is an admin, proceed
  }

  res.status(403); // ❌ Forbidden (not authorized)
  throw new Error("Not authorized as admin");
};


export { protect ,admin};
