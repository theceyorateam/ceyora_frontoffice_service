// src/models/region_model.ts
import { PrismaClient } from '@prisma/client';
import { Region } from '../types/Region';

const prisma = new PrismaClient();

interface CreateRegionData {
    districtId: number;
    regionName: string;
    searchTimes: number;
}

interface GetRegionData {
    regionId: number;
}

export const create = async (
    data: CreateRegionData
): Promise<{ data?: Region; error?: string }> => {
    try {
        const region = await prisma.r1_region.create({
            data: {
                r1_district_id: data.districtId,
                r1_region_name: data.regionName,
                search_times: data.searchTimes,
            },
        });

        return { data: region as Region };
    } catch (err: any) {
        console.error('Error creating region:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (
    data: GetRegionData
): Promise<{ data?: Region; error?: string }> => {
    try {
        const region = await prisma.r1_region.findUnique({
            where: {
                r1_region_id: data.regionId,
            },
        });

        if (!region) return { error: 'Region not found' };

        return { data: region as Region };
    } catch (err: any) {
        console.error('Error fetching region:', err.message);
        return { error: 'Internal server error' };
    }
};
