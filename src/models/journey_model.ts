// src/models/journey_model.ts
import { PrismaClient } from '@prisma/client';
import { Journey } from '../types/Journey';

const prisma = new PrismaClient();

export const create = async (data: Journey): Promise<{ data?: Journey; error?: string }> => {
    try {
        const journey = await prisma.j1_journey.create({
            data: {
                vendor_id: data.vendorId,
                customer_id: data.customerId,
                scheduled_date_time: data.scheduledDateTime,
                package_id: data.packageId,
                is_cancelled: data.isCancelled,
                cancelled_date: data.cancelledDate,
                is_refunded: data.isRefunded,
                refunded_date: data.refundedDate,
                last_updated_date: data.lastUpdatedDate,
                is_vendor_approved: data.isVendorApproved,
                vendor_approved_date: data.vendorApprovedDate,
            },
        });

        return { data: journey as Journey };
    } catch (err: any) {
        console.error('Error creating journey:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (data: { journeyId: number }): Promise<{ data?: Journey; error?: string }> => {
    try {
        const journey = await prisma.j1_journey.findUnique({
            where: {
                journey_id: data.journeyId,
            },
        });

        if (!journey) return { error: 'Journey not found' };

        return { data: journey as Journey };
    } catch (err: any) {
        console.error('Error fetching journey:', err.message);
        return { error: 'Internal server error' };
    }
};
