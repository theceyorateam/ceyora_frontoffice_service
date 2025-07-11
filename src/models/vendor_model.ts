// src/models/vendor_model.ts
import { PrismaClient } from '@prisma/client';
import { Vendor } from '../types/Vendor';

const prisma = new PrismaClient();

interface CreateResult {
    data?: Vendor;
    error?: string;
}

export const create = async (data: Vendor): Promise<CreateResult> => {
    const {
        themeId,
        location,
        totalRatePoints,
        rateCount,
        vendorTitle,
        vendorDescription,
        vendorAdditionalData,
        vendorContactNo1,
        vendorContactNo2,
        vendorEmail,
        vendorRegion,
    } = data;

    try {
        const vendor = await prisma.v1_vendor.create({
            data: {
                t1_theme_id: themeId,
                location,
                total_rate_points: totalRatePoints ?? 0,
                rate_count: rateCount ?? 0,
                vendor_title: vendorTitle,
                vendor_description: vendorDescription,
                vendor_additional_data: vendorAdditionalData,
                vendor_registered_date: new Date(),
                vendor_contact_number_1: vendorContactNo1,
                vendor_contact_number_2: vendorContactNo2,
                vendor_email: vendorEmail,
            },
        });

        await prisma.w1_vendor_region.create({
            data: {
                vendor_id: vendor.vendor_id,
                region_id: vendorRegion,
            },
        });

        return { data: vendor as Vendor };
    } catch (err: any) {
        console.error('Error creating vendor:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (
    data: { vendorId: number }
): Promise<CreateResult> => {
    try {
        const vendor = await prisma.v1_vendor.findUnique({
            where: {
                vendor_id: data.vendorId,
            },
        });

        if (!vendor) return { error: 'Vendor not found' };
        return { data: vendor as Vendor };
    } catch (err: any) {
        console.error('Error fetching vendor:', err.message);
        return { error: 'Internal server error' };
    }
};
