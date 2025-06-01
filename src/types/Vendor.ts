// types/vendor.d.ts or types/vendor.ts
export interface Vendor {
    vendorId?: number; // optional, because usually DB assigns this
    themeId: number;
    location: string;
    district?: string;
    totalRatePoints: number;
    rateCount: number;
    vendorTitle: string;
    vendorDescription: string;
    vendorAdditionalData?: string;
    registeredDate?: Date;
    vendorContactNo1: string;
    vendorContactNo2?: string;
    vendorEmail: string;
    vendorRegion?: string;
}
