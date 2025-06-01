"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const customer_routes_1 = __importDefault(require("./routes/customer_routes"));
const vendor_routes_1 = __importDefault(require("./routes/vendor_routes"));
const package_routes_1 = __importDefault(require("./routes/package_routes"));
const theme_routes_1 = __importDefault(require("./routes/theme_routes"));
const journey_routes_1 = __importDefault(require("./routes/journey_routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/customer', customer_routes_1.default);
app.use('/vendor', vendor_routes_1.default);
app.use('/package', package_routes_1.default);
app.use('/journey', journey_routes_1.default);
app.use('/theme', theme_routes_1.default);
// Optional sanity check
// app.get('/', (_req, res) => res.send('App is running'));
exports.default = app;
