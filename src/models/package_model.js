const db = require('../config/PrimaryDbConfigs')

exports.create = async (data) => {
    const {
        vendorId,
        packageDescription,
        price,

    } = data;

    try {

        const result = await db.query(
            `INSERT INTO ceyora_db.p1_package
             (vendor_id, package_description, price)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [vendorId, packageDescription, price]
        );

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error creating package:', err.message);
        return {error: 'Internal server error'};
    }
}

exports.get = async (data) => {
    const {packageId} = data;

    try {
        const result = await db.query(
            `SELECT *
             FROM ceyora_db.p1_package
             WHERE package_id = $1`,
            [packageId]
        );

        if (result.rows.length === 0) {
            return {error: 'Package not found'};
        }

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error fetching customer:', err.message);
        return {error: 'Internal server error'};
    }
}