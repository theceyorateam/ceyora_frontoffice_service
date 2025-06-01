import { Vendor } from '../types/Vendor';

import db from '../config/PrimaryDbConfigs';

interface CreateResult {
    data?: Vendor;
    error?: string;
}

export const create = async (data: Vendor): Promise<CreateResult> => {
    const { themeId, location, totalRatePoints, rateCount, vendorTitle, vendorDescription, vendorAdditionalData, vendorContactNo1, vendorContactNo2, vendorEmail } = data;

    try {
        const result = await db.query(
            `INSERT INTO ceyora_db.v1_vendor
       (t1_theme_id, location, total_rate_points, rate_count, vendor_title, vendor_description, vendor_additional_data, vendor_registered_date, vendor_contact_number_1, vendor_contact_number_2, vendor_email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
            [themeId, location, totalRatePoints, rateCount, vendorTitle, vendorDescription, vendorAdditionalData, new Date(), vendorContactNo1, vendorContactNo2, vendorEmail]
        );

        return { data: result.rows[0] };
    } catch (err: any) {
        console.error('Error creating vendor:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (data: { vendorId: number }): Promise<CreateResult> => {
    const { vendorId } = data;

    try {
        const result = await db.query(
            `SELECT * FROM ceyora_db.v1_vendor WHERE vendor_id = $1`,
            [vendorId]
        );

        if (result.rows.length === 0) {
            return { error: 'Vendor not found' };
        }

        return { data: result.rows[0] };
    } catch (err: any) {
        console.error('Error fetching vendor:', err.message);
        return { error: 'Internal server error' };
    }
};
