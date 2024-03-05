"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = exports.BadRequestError = exports.NotFoundError = exports.RequestValidationError = exports.CustomError = void 0;
var custom_error_1 = require("./custom-error");
Object.defineProperty(exports, "CustomError", { enumerable: true, get: function () { return __importDefault(custom_error_1).default; } });
var request_validation_error_1 = require("./request-validation-error");
Object.defineProperty(exports, "RequestValidationError", { enumerable: true, get: function () { return __importDefault(request_validation_error_1).default; } });
var not_found_error_1 = require("./not-found-error");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return __importDefault(not_found_error_1).default; } });
var bad_request_error_1 = require("./bad-request-error");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return __importDefault(bad_request_error_1).default; } });
var not_authorized_error_1 = require("./not-authorized-error");
Object.defineProperty(exports, "NotAuthorizedError", { enumerable: true, get: function () { return __importDefault(not_authorized_error_1).default; } });
