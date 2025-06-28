import db from '../config/PrimaryDbConfigs';
import { Region } from '../types/Region';

interface CreateRegionData {
    districtId: number;
    regionName: string;
    searchTimes: number;
}

interface GetRegionData {
    regionId: number;  // Fix: You had vendorId by mistake; should be regionId for the query
}

export const create = async (data: CreateRegionData): Promise<{ data?: Region; error?: string }> => {
    const { districtId, regionName, searchTimes } = data;

    try {
        const result = await db.query(
            `INSERT INTO ceyora_db.r1_region
       (r1_district_id, r1_region_name, search_times)
       VALUES ($1, $2, $3)
       RETURNING *`,
            [districtId, regionName, searchTimes]
        );

        return { data: result.rows[0] };
    } catch (err: any) {
        console.error('Error creating region:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (data: GetRegionData): Promise<{ data?: Region; error?: string }> => {
    const { regionId } = data;

    try {
        const result = await db.query(
            `SELECT *
       FROM ceyora_db.r1_region
       WHERE region_id = $1`,
            [regionId]
        );

        if (result.rows.length === 0) {
            return { error: 'Region not found' };
        }

        return { data: result.rows[0] };
    } catch (err: any) {
        console.error('Error fetching region:', err.message);
        return { error: 'Internal server error' };
    }
};
