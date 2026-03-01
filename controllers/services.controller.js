import Service from "../models/services.model.js";
import createError from "http-errors";

// GET ALL
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().lean();

    const data = services.map((item) => ({
      ...item,
      id: item._id,
      _id: undefined
    }));

    res.json({
      success: true,
      message: "Services list retrieved successfully.",
      data
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id).lean();
    if (!service) throw createError(404, "Service not found");

    res.json({
      success: true,
      message: "Service retrieved successfully.",
      data: {
        ...service,
        id: service._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// ADD NEW
export const addService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res.json({
      success: true,
      message: "Service added successfully.",
      data: {
        ...service.toObject(),
        id: service._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateService = async (req, res, next) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) throw createError(404, "Service not found");

    res.json({
      success: true,
      message: "Service updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteService = async (req, res, next) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) throw createError(404, "Service not found");

    res.json({
      success: true,
      message: "Service removed successfully."
    });
  } catch (err) {
    next(err);
  }
};