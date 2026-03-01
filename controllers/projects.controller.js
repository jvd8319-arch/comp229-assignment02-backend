import Project from "../models/projects.model.js";
import createError from "http-errors";

// GET ALL
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().lean();

    const data = projects.map((item) => ({
      ...item,
      id: item._id,
      _id: undefined
    }));

    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) throw createError(404, "Project not found");

    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: {
        ...project,
        id: project._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// ADD NEW
export const addProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.json({
      success: true,
      message: "Project added successfully.",
      data: {
        ...project.toObject(),
        id: project._id,
        _id: undefined
      }
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateProject = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) throw createError(404, "Project not found");

    res.json({
      success: true,
      message: "Project updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteProject = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) throw createError(404, "Project not found");

    res.json({
      success: true,
      message: "Project removed successfully."
    });
  } catch (err) {
    next(err);
  }
};