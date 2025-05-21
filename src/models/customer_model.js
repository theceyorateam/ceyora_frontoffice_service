const db = require('../config/PrimaryDbConfigs');
const ErrorMessages = require('../utils/ResponseMessages/ErrorMessages')

exports.create = async (data) => {
    const {firstName, lastName, country, email, phoneNumber, password, username} = data;

    try {
        const existing = await db.query(
            'SELECT 1 FROM ceyora_db.c1_customer WHERE username = $1',
            [username]
        );

        if (existing.rows.length > 0) {
            return {error: ErrorMessages.DUPLICATE_USERNAME};
        }

        const result = await db.query(
            `INSERT INTO ceyora_db.c1_customer
             (first_name, last_name, country, email, phone_number, created_at, username, c1_password)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [firstName, lastName, country, email, phoneNumber, new Date(), username, password]
        );

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error creating customer:', err.message);
        return {error: 'Internal server error'}; // or rethrow if needed
    }
};


exports.get = async (data) => {
    const {customerId} = data;

    try {
        const result = await db.query(
            `SELECT * FROM ceyora_db.c1_customer 
             WHERE customer_id = $1`,
            [customerId]
        );

        if (result.rows.length === 0) {
            return {error: 'Customer not found'};
        }

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error fetching customer:', err.message);
        return {error: 'Internal server error'};
    }
};

