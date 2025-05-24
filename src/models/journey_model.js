const db = require('../config/PrimaryDbConfigs')

exports.create = async (data) => {
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
            `insert into ceyora_db.j1_journey (vendor_id, scheduled_date_time, package_id, is_cancelled, cancelled_date,is_refunded, refunded_date, last_updated_date, is_vendor_approved, vendor_approved_date)
             values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
            [vendorId, scheduledDateTime, packageId, isCancelled, cancelledDate, isRefunded, refundedDate, lastUpdatedDate, isVendorApproved, vendorApprovedDate]
        );

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error creating joruney:', err.message);
        return {error: 'Internal server error'};
    }
}

exports.get = async (data) => {
    const {journeyId} = data;

    try {
        const result = await db.query(
            `SELECT *
             FROM ceyora_db.j1_journey
             WHERE journey_id = $1`,
            [journeyId]
        );

        if (result.rows.length === 0) {
            return {error: 'Journey not found'};
        }

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error fetching joruney:', err.message);
        return {error: 'Internal server error'};
    }
}