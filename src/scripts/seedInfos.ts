import mongoose from "mongoose";
import { User } from "../models";
import { Info } from "../interfaces";

// Kết nối database trước
mongoose.connect(
  "mongodb://mongo:mnQObcoYGHaLmYJmLuKoAOsbNLhwJedd@mongodb.railway.internal:27017"
);

const seedInfos = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const existingInfo = await Info.findOne({ email: user.email });

      if (!existingInfo) {
        await Info.create({
          email: user.email,
          gender: "Male",
          address: "Not provided",
          birthday: new Date("2000-01-01"), // hoặc null tùy bạn
        });

        console.log(`Info created for ${user.email}`);
      } else {
        console.log(`Info already exists for ${user.email}`);
      }
    }

    console.log("✅ Seed completed!");
  } catch (error) {
    console.error("❌ Seed error:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedInfos();
