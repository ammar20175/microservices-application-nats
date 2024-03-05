"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const requireAuthMiddleware = (req, res, next) => {
    if (!req.currentUser) {
        throw new errors_1.NotAuthorizedError();
    }
    next();
};
exports.default = requireAuthMiddleware;
