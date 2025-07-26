import { PrismaClient } from '@prisma/client';
import { DBResult } from '../types/Customer';
import ErrorMessages from '../utils/ResponseMessages/ErrorMessages';

const prisma = new PrismaClient();

export const create = async (data: {
    firstName: string;
    lastName: string;
    country: string;
    email?: string;
    phoneNumber?: string;
    password: string;
    username: string;
}): Promise<DBResult<any>> => {
    try {
        const customer = await prisma.c1_customer.create({
            data: {
                first_name: data.firstName,
                last_name: data.lastName,
                country: data.country,
                email: data.email,
                phone_number: data.phoneNumber,
                username: data.username,
                c1_password: data.password,
                created_at: new Date(),
            },
        });

        return { data: customer };
    } catch (err: any) {
        // Handle unique constraint errors (Postgres error code 23505)
        if (err.code === 'P2002' && err.meta?.target?.includes('username')) {
            return { error: ErrorMessages.DUPLICATE_USERNAME };
        }
        return { error: 'Failed to create customer' };
    }
};

export const get = async ({
                              customerId,
                          }: {
    customerId: number;
}): Promise<DBResult<any>> => {
    try {
        const customer = await prisma.c1_customer.findUnique({
            where: { customer_id: customerId },
        });

        if (!customer) return { error: 'Customer not found' };
        return { data: customer };
    } catch (err: any) {
        console.error('Error fetching customer:', err.message);
        return { error: 'Internal server error' };
    }
};
