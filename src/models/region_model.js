const db = require('../config/PrimaryDbConfigs')

exports.create = async (data) => {
    const {} = data;

    try {

        const result = await db.query(
            `INSERT INTO ceyora_db.v1_vendor
             (t1_theme_id, location, district, total_rate_points, rate_count, vendor_title, vendor_description, vendor_additional_data, vendor_registered_date, vendor_contact_number_1, vendor_contact_number_2, vendor_email, vendor_region)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
             RETURNING *`,
            [themeId, location, district, totalRatePoints, rateCount, vendorTitle, vendorDescription, vendorAdditionalData,  new Date(), vendorContactNo1, vendorContactNo2, vendorEmail, vendorRegion]
        );

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error creating vendor:', err.message);
        return {error: 'Internal server error'};
    }
}

exports.get = async (data) => {
    const {vendorId} = data;

    try {
        const result = await db.query(
            `SELECT *
             FROM ceyora_db.v1_vendor
             WHERE vendor_id = $1`,
            [vendorId]
        );

        if (result.rows.length === 0) {
            return {error: 'Customer not found'};
        }

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error fetching customer:', err.message);
        return {error: 'Internal server error'};
    }
}