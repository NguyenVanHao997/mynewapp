"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err);
    if (err.status && err.status >= 400 && err.status < 500) {
        return res.status(err.status).json({ message: err.message });
    }
    res.status(500).json({ message: (err === null || err === void 0 ? void 0 : err.message) || "Internal server error" });
};
exports.default = errorHandler;
