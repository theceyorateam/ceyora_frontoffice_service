// types/Customer.ts
export interface Customer {
    customerId?: number;
    firstName: string;
    lastName: string;
    country: string;
    email: string;
    phoneNumber: string;
    password: string;
    username: string;
}

export interface DBResult<T> {
    data?: T;
    error?: string;
}
