// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import createError from "http-errors";

export const verifyToken = (req, res, next) => {
  console.log("verifyToken middleware executed"); // DEBUG LOG

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "No token provided"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return next(createError(401, "Invalid or expired token"));
  }
};