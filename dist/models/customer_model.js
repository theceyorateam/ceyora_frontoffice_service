"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.create = void 0;
const PrimaryDbConfigs_1 = __importDefault(require("../config/PrimaryDbConfigs"));
const create = async (data) => {
    const { firstName, lastName, country, email, phoneNumber, password, username } = data;
    // const existing = await db.query('SELECT 1 FROM ceyora_db.c1_customer WHERE username = $1', [username]);
    // if (existing.rows.length > 0) {
    //     return { error: ErrorMessages.DUPLICATE_USERNAME };
    // }
    const result = await PrimaryDbConfigs_1.default.query(`INSERT INTO ceyora_db.c1_customer
         (first_name, last_name, country, email, phone_number, created_at, username, c1_password)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`, [firstName, lastName, country, email, phoneNumber, new Date(), username, password]);
    return { data: result.rows[0] };
};
exports.create = create;
const get = async ({ customerId }) => {
    try {
        const result = await PrimaryDbConfigs_1.default.query('SELECT * FROM ceyora_db.c1_customer WHERE customer_id = $1', [customerId]);
        if (result.rows.length === 0)
            return { error: 'Customer not found' };
        return { data: result.rows[0] };
    }
    catch (err) {
        console.error('Error fetching customer:', err.message);
        return { error: 'Internal server error' };
    }
};
exports.get = get;
