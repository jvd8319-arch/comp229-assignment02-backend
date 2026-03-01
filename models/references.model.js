import mongoose from "mongoose";

const referenceSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Reference", referenceSchema);