import User from "../models/users.model.js";
import createError from "http-errors";

// GET ALL
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();

    const data = users.map((item) => ({
      ...item,
      id: item._id,
      _id: undefined
    }));

    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) throw createError(404, "User not found");

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: {
        ...user,
        id: user._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// ADD NEW
export const addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.json({
      success: true,
      message: "User added successfully.",
      data: {
        ...user.toObject(),
        id: user._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) throw createError(404, "User not found");

    res.json({
      success: true,
      message: "User updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) throw createError(404, "User not found");

    res.json({
      success: true,
      message: "User removed successfully."
    });
  } catch (err) {
    next(err);
  }
};