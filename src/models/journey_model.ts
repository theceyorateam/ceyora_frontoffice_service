// src/models/journey_model.ts
import { PrismaClient } from '@prisma/client';
import { Journey } from '../types/Journey';

const prisma = new PrismaClient();

/**
 * Create a new journey
 */
export const create = async (data: Journey): Promise<{ data?: Journey; error?: string }> => {
    console.log('Creating journey with data:', data);
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

        console.log('Journey created successfully:', journey);
        return { data: journey as Journey };
    } catch (err: any) {
        console.error('Error creating journey:', err.message);
        return { error: 'Internal server error' };
    }
};

/**
 * Get a journey by ID
 */
export const get = async (data: { journeyId: number }): Promise<{ data?: Journey; error?: string }> => {
    console.log('Fetching journey with ID:', data.journeyId);
    try {
        const journey = await prisma.j1_journey.findUnique({
            where: {
                journey_id: data.journeyId,
            },
        });

        if (!journey) {
            console.warn('Journey not found with ID:', data.journeyId);
            return { error: 'Journey not found' };
        }

        console.log('Journey retrieved successfully:', journey);
        return { data: journey as Journey };
    } catch (err: any) {
        console.error('Error fetching journey:', err.message);
        return { error: 'Internal server error' };
    }
};

/**
 * Get all journeys
 */
export const getAll = async (): Promise<{ data?: Journey[]; error?: string }> => {
    console.log('Fetching all journeys');
    try {
        const journeys = await prisma.j1_journey.findMany();

        if (!journeys || journeys.length === 0) {
            console.warn('No journeys found in the database');
            return { error: 'No journeys found' };
        }

        console.log(`Successfully retrieved ${journeys.length} journeys`);
        return { data: journeys as unknown as Journey[] };
    } catch (err: any) {
        console.error('Error fetching all journeys:', err.message);
        return { error: 'Internal server error' };
    }
};
