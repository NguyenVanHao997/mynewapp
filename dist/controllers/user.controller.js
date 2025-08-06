"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.updateInfoByEmail = exports.getUserProfile = exports.uploadUserAvatar = exports.searchUsers = exports.updateUserName = exports.getAllUsers = void 0;
const models_1 = require("../models");
const search_service_1 = require("../services/user/search.service");
const user_1 = require("../services/user");
const updateUserRole_service_1 = require("../services/user/updateUserRole.service");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pagQuery = 1, limitQuery = 5 } = req.query;
        const page = parseInt(pagQuery);
        const limit = parseInt(limitQuery);
        // const cacheKey = `users:page:${page}:limit:${limit}`;
        // const cachedData = await redisClient.get(cacheKey);
        // if (cachedData) {
        //   console.log("⚡ From Redis", JSON.parse(cachedData));
        //   return res.json(JSON.parse(cachedData));
        // }
        // // 2. Nếu chưa có, lấy từ DB
        // const result = await paginate(User, { page, limit });
        // // 3. Cache lại trong 5 phút (300 giây)
        // await redisClient.set(cacheKey, JSON.stringify(result), { EX: 300 });
        const result = yield (0, user_1.getAllUsersService)(page, limit);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const updateUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ message: "Thiếu email hoặc name" });
        }
        const updatedUser = yield models_1.User.findOneAndUpdate({ email }, { name }, { new: true });
        if (!updatedUser) {
            return res
                .status(404)
                .json({ message: "Không tìm thấy user với email này" });
        }
        res.status(200).json({ message: "Cập nhật thành công", user: updatedUser });
    }
    catch (error) {
        console.error("Lỗi cập nhật user:", error);
        res.status(500).json({ error: "Lỗi server khi cập nhật user" });
    }
});
exports.updateUserName = updateUserName;
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword, page = "1", limit = "10", sort = "name" } = req.query;
        if (!keyword || typeof keyword !== "string") {
            return res
                .status(400)
                .json({ message: "Thiếu hoặc sai định dạng keyword" });
        }
        const result = yield (0, search_service_1.searchUsersService)(keyword, page, limit, sort);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        res.status(500).json({ error: "Lỗi server khi tìm kiếm" });
    }
});
exports.searchUsers = searchUsers;
const uploadUserAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.body.email) === null || _a === void 0 ? void 0 : _a.trim();
        const file = req.file;
        if (!email)
            return res.status(400).json({ message: "Thiếu email" });
        if (!file)
            return res.status(400).json({ message: "Thiếu file" });
        const imagePath = `/uploads/${file.filename}`;
        const updatedUser = yield (0, user_1.uploadUserAvatarService)(email, imagePath);
        return res.status(200).json({
            message: "Upload thành công",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error(">>> Lỗi server khi upload:", error);
        return res.status(500).json({ message: "Lỗi server", error });
    }
});
exports.uploadUserAvatar = uploadUserAvatar;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const data = yield (0, user_1.getUserProfileByEmail)(email);
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
});
exports.getUserProfile = getUserProfile;
//SQL
// -- Nếu đã có bản ghi với email, thì update:
// UPDATE infos
// SET gender = 'Male',
//     address = '123 Example St',
//     birthday = '1995-01-01'
// WHERE email = 'example@gmail.com';
// -- Nếu không có thì insert mới:
// INSERT INTO infos (email, gender, address, birthday)
// SELECT 'example@gmail.com', 'Male', '123 Example St', '1995-01-01'
// WHERE NOT EXISTS (
//   SELECT 1 FROM infos WHERE email = 'example@gmail.com'
// );
//   MYSQL
//   INSERT INTO infos (email, gender, address, birthday)
// VALUES ('example@gmail.com', 'Male', '123 Example St', '1995-01-01')
// ON CONFLICT (email)
// DO UPDATE SET gender = EXCLUDED.gender,
//               address = EXCLUDED.address,
//               birthday = EXCLUDED.birthday;
const updateInfoByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { gender, address, birthday } = req.body;
    if (!email)
        return res.status(400).json({ message: "Thiếu email" });
    try {
        const updatedInfo = yield (0, user_1.updateUserInfoService)(email, {
            gender,
            address,
            birthday,
        });
        res.status(200).json(updatedInfo);
    }
    catch (error) {
        console.error("Update info failed:", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});
exports.updateInfoByEmail = updateInfoByEmail;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.body;
    if (!email || !role) {
        return res.status(400).json({ message: "Thiếu email hoặc role" });
    }
    const userToUpdate = yield models_1.User.findOne({ email });
    if (!userToUpdate) {
        return res
            .status(404)
            .json({ message: "Không tìm thấy user cần cập nhật" });
    }
    if (!["SUPER_ADMIN", "ADMIN", "CUSTOMER"].includes(role)) {
        return res.status(400).json({ message: "Vai trò không hợp lệ" });
    }
    try {
        const updatedUser = yield (0, updateUserRole_service_1.updateUserRoleService)(email, role);
        res.status(200).json({ message: "Cập nhật thành công", user: updatedUser });
    }
    catch (error) {
        console.error("Lỗi khi cập nhật vai trò:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});
exports.updateUserRole = updateUserRole;
