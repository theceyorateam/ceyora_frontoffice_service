// File: src/models/vendor_model.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const parseAdditionalData = (vendor: any) => {
    if (vendor.vendorAdditionalData) {
        try {
            vendor.vendorAdditionalData = JSON.parse(vendor.vendorAdditionalData as any);
        } catch (e) {
            vendor.vendorAdditionalData = {};
        }
    } else {
        vendor.vendorAdditionalData = {};
    }
    return vendor;
};

// Get all vendors
export const getAll = async () => {
    try {
        const vendors = await prisma.v1Vendor.findMany({
            include: {
                packages: true,
                theme: true,
                regions: true
            }
        });
        return { data: vendors.map(parseAdditionalData) };
    } catch (error: any) {
        return { error: error.message };
    }
};

// Get vendor by ID
export const getById = async (vendorId: number) => {
    try {
        const vendor = await prisma.v1Vendor.findUnique({
            where: { vendorId },
            include: {
                packages: true,
                theme: true,
                regions: true
            }
        });
        return vendor ? { data: parseAdditionalData(vendor) } : { error: "Vendor not found" };
    } catch (error: any) {
        return { error: error.message };
    }
};

// Get vendors by theme title
export const getByTheme = async (themeTitle: string) => {
    try {
        const vendors = await prisma.v1Vendor.findMany({
            where: {
                theme: {
                    themeTitle
                }
            },
            include: {
                packages: true,
                theme: true,
                regions: true
            }
        });
        return { data: vendors.map(parseAdditionalData) };
    } catch (error: any) {
        return { error: error.message };
    }
};

// Create new vendor
export const createVendor = async (vendorData: any) => {
    try {
        const vendor = await prisma.v1Vendor.create({
            data: {
                themeId: vendorData.themeId,
                location: vendorData.location,
                totalRatePoints: vendorData.totalRatePoints,
                rateCount: vendorData.rateCount,
                vendorTitle: vendorData.vendorTitle,
                vendorDescription: vendorData.vendorDescription,
                vendorAdditionalData: vendorData.vendorAdditionalData
                    ? JSON.stringify(vendorData.vendorAdditionalData)
                    : null,
                vendorContactNumber1: vendorData.vendorContactNumber1,
                vendorContactNumber2: vendorData.vendorContactNumber2 || null,
                vendorEmail: vendorData.vendorEmail || null,
                hostLanguages: vendorData.hostLanguages || []
            },
            include: {
                packages: true,
                theme: true,
                regions: true
            }
        });

        return { data: parseAdditionalData(vendor) };
    } catch (error: any) {
        return { error: error.message };
    }
};

/**
 * Calculates available time slots for a given vendor on a specific date.
 * @param vendorId The ID of the vendor.
 * @param targetDate The date (YYYY-MM-DD) to check availability for.
 * @returns An object containing data (available slots) or an error.
 */
export const getAvailableSlotsByVendor = async (vendorId: number, targetDate: string) => {
    try {
        // 1. Basic Vendor Check
        const vendorCheck = await prisma.v1Vendor.findUnique({
            where: { vendorId },
            select: { vendorId: true }
        });

        if (!vendorCheck) {
            return { error: "Vendor not found" };
        }

        // --- Date Setup ---
        const date = new Date(targetDate);
        date.setHours(0, 0, 0, 0); // Start of the target day

        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1); // Start of the next day

        // 2. Fetch existing scheduled (uncancelled) journeys for the vendor on the target date
        const scheduledJourneys = await prisma.j1Journey.findMany({
            where: {
                vendorId: vendorId,
                isCancelled: 0,
                scheduledDateTime: {
                    gte: date, // Greater than or equal to start of day
                    lt: nextDay // Less than start of next day
                }
            },
            select: {
                scheduledDateTime: true,
            }
        });

        // Convert existing bookings to a Set for quick lookup
        const bookedTimes = new Set(
            scheduledJourneys.map(j => j.scheduledDateTime.toISOString())
        );

        // 3. Generate time slots and filter out booked/past slots
        const availableSlots: string[] = [];
        const now = new Date();

        // Define the working hours (9:00 AM to 5:00 PM)
        const startHour = 9;
        const endHour = 17; // Represents 5:00 PM (slots from 9 up to 4 PM)

        for (let hour = startHour; hour < endHour; hour++) {
            const slot = new Date(date);
            slot.setHours(hour, 0, 0, 0); // Set to the start of the hour

            // Check: Only include slots that are strictly in the future relative to NOW
            if (slot.getTime() > now.getTime()) {
                const slotISO = slot.toISOString();

                // Check if this specific slot is already booked
                if (!bookedTimes.has(slotISO)) {
                    availableSlots.push(slotISO);
                }
            }
        }

        // 4. Return the list of available slots
        return { data: availableSlots };

    } catch (error: any) {
        console.error('Error fetching available slots:', error);
        // Handle database or unexpected errors
        return { error: `Error processing request: ${error.message}` };
    }
};