// src/models/package_model.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export const create = async (
    data: PackageData
): Promise<Result<any>> => {
    try {
        const pkg = await prisma.p1_package.create({
            data: {
                vendor_id: data.vendorId,
                package_description: data.packageDescription,
                price: data.price,
            },
        });

        return { data: pkg };
    } catch (err: any) {
        console.error('Error creating package:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (
    data: PackageGetData
): Promise<Result<any>> => {
    try {
        const pkg = await prisma.p1_package.findUnique({
            where: {
                package_id: data.packageId,
            },
        });

        if (!pkg) return { error: 'Package not found' };
        return { data: pkg };
    } catch (err: any) {
        console.error('Error fetching package:', err.message);
        return { error: 'Internal server error' };
    }
};
