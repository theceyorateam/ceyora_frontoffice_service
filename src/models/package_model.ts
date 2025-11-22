// src/models/package_model.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PackageData {
    vendorId: number;
    packageDescription: string;
    price: number;
    priceUSD?: number;
    duration?: string;
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
        const pkg = await prisma.p1Package.create({
            data: {
                vendorId: data.vendorId,
                packageDescription: data.packageDescription,
                price: data.price,
                priceUSD: data.priceUSD,
                duration: data.duration,
            },
        });

        return { data: pkg };
    } catch (err: any) {
        console.error('Error creating package:', err);  // full error log
        return {
            error: `Internal server error: ${err.message || 'Unknown error'}`,
        };
    }
};

export const get = async (
    data: PackageGetData
): Promise<Result<any>> => {
    try {
        const pkg = await prisma.p1Package.findUnique({
            where: {
                packageId: data.packageId,
            },
        });

        if (!pkg) return { error: 'Package not found' };
        return { data: pkg };
    } catch (err: any) {
        console.error('Error fetching package:', err);  // full error log
        return {
            error: `Internal server error: ${err.message || 'Unknown error'}`,
        };
    }
};
