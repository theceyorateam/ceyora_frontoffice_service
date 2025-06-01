import db from '../config/PrimaryDbConfigs';

interface PackageData {
    vendorId: number;
    packageDescription: string;
    price: number;
}

interface PackageGetData {
    packageId: number;
}

interface Result<T> {
    data?: T;
    error?: string;
}

interface PackageRecord {
    package_id: number;
    vendor_id: number;
    package_description: string;
    price: number;
    // add other columns if exist
}

export const create = async (data: PackageData): Promise<Result<PackageRecord>> => {
    const { vendorId, packageDescription, price } = data;

    try {
        const result = await db.query<PackageRecord>(
            `INSERT INTO ceyora_db.p1_package
       (vendor_id, package_description, price)
       VALUES ($1, $2, $3)
       RETURNING *`,
                [vendorId, packageDescription, price]
        );

        return { data: result.rows[0] };
    } catch (err: any) {
        console.error('Error creating package:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (data: PackageGetData): Promise<Result<PackageRecord>> => {
    const { packageId } = data;

    try {
        const result = await db.query<PackageRecord>(
            `SELECT *
       FROM ceyora_db.p1_package
       WHERE package_id = $1`,
                [packageId]
        );

        if (result.rows.length === 0) {
            return { error: 'Package not found' };
        }

        return { data: result.rows[0] };
    } catch (err: any) {
        console.error('Error fetching package:', err.message);
        return { error: 'Internal server error' };
    }
};
