"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendor_controller_1 = require("../controllers/vendor_controller");
const routes = express_1.default.Router();
routes.post('/', vendor_controller_1.createVendor);
routes.get('/', vendor_controller_1.getVendor);
//routes.get('/:vendorId', getVendor);
exports.default = routes;
