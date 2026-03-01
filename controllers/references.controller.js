import Reference from "../models/references.model.js";
import createError from "http-errors";

// GET ALL
export const getAllReferences = async (req, res, next) => {
  try {
    const refs = await Reference.find().lean();

    const data = refs.map((item) => ({
      ...item,
      id: item._id,
      _id: undefined
    }));

    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getReferenceById = async (req, res, next) => {
  try {
    const ref = await Reference.findById(req.params.id).lean();
    if (!ref) throw createError(404, "Reference not found");

    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: {
        ...ref,
        id: ref._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// ADD NEW
export const addReference = async (req, res, next) => {
  try {
    const ref = await Reference.create(req.body);

    res.json({
      success: true,
      message: "Reference added successfully.",
      data: {
        ...ref.toObject(),
        id: ref._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateReference = async (req, res, next) => {
  try {
    const updated = await Reference.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) throw createError(404, "Reference not found");

    res.json({
      success: true,
      message: "Reference updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteReference = async (req, res, next) => {
  try {
    const deleted = await Reference.findByIdAndDelete(req.params.id);
    if (!deleted) throw createError(404, "Reference not found");

    res.json({
      success: true,
      message: "Reference removed successfully."
    });
  } catch (err) {
    next(err);
  }
};