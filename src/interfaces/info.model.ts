import mongoose from "mongoose";
import { infoSchema } from "../Schema";

const Info = mongoose.model("Info", infoSchema);

export default Info;
