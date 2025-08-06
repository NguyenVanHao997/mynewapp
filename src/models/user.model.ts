import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatarImg: string;
  role: string;
}
export type UserDocument = Document & IUser;
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarImg: { type: String, default: "" },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "CUSTOMER"],
      default: "CUSTOMER",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
