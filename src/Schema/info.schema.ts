import mongoose from "mongoose";

const infoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    address: { type: String },
    birthday: { type: Date },
  },
  { timestamps: true }
);

export default infoSchema;
