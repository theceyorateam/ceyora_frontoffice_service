import { Journey } from '../types/Journey';
import db from '../config/PrimaryDbConfigs';

export const create = async (data: Journey): Promise<{ data?: Journey; error?: string }> => {
    const {
        vendorId,
        scheduledDateTime,
        packageId,
        isCancelled,
        cancelledDate,
        isRefunded,
        refundedDate,
        lastUpdatedDate,
        isVendorApproved,
        vendorApprovedDate
    } = data;

    try {
        const result = await db.query(
            `INSERT INTO ceyora_db.j1_journey (
         vendor_id, scheduled_date_time, package_id, is_cancelled, cancelled_date,
         is_refunded, refunded_date, last_updated_date, is_vendor_approved, vendor_approved_date
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *;`,
            [
                vendorId, scheduledDateTime, packageId, isCancelled, cancelledDate,
                isRefunded, refundedDate, lastUpdatedDate, isVendorApproved, vendorApprovedDate
            ]
        );

        return { data: result.rows[0] as Journey };

    } catch (err: any) {
        console.error('Error creating journey:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (data: { journeyId: number }): Promise<{ data?: Journey; error?: string }> => {
    const { journeyId } = data;

    try {
        const result = await db.query(
            `SELECT * FROM ceyora_db.j1_journey WHERE journey_id = $1`,
            [journeyId]
        );

        if (result.rows.length === 0) {
            return { error: 'Journey not found' };
        }

        return { data: result.rows[0] as Journey };

    } catch (err: any) {
        console.error('Error fetching journey:', err.message);
        return { error: 'Internal server error' };
    }
};
