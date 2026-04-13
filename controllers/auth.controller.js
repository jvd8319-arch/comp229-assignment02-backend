// controllers/auth.controller.js
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "http-errors";

export const signup = async (req, res, next) => {
  console.log("🔥 SIGNUP controller reached"); // DEBUG LOG

  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return next(new createError(400, "All fields are required"));
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return next(new createError(409, "Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Signup successful",
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new createError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new createError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new createError(401, "Invalid credentials"));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};