import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatarImg: string;
  role: "SUPER_ADMIN" | "ADMIN" | "CUSTOMER";
}

export type UserDocument = Document & IUser;
