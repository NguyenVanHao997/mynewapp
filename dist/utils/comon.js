"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxTokensByRole = void 0;
const getMaxTokensByRole = (role) => {
    switch (role) {
        case "SUPER_ADMIN":
            return 10;
        case "ADMIN":
            return 5;
        default:
            return 1;
    }
};
exports.getMaxTokensByRole = getMaxTokensByRole;
