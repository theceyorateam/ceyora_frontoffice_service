export interface Journey {
    journeyId?: number;
    vendorId: number;
    scheduledDateTime: string; // or Date if you're using proper JS dates
    packageId: number;
    isCancelled: boolean;
    cancelledDate: string | null; // ISO string or null
    isRefunded: boolean;
    refundedDate: string | null;
    lastUpdatedDate: string;
    isVendorApproved: boolean;
    vendorApprovedDate: string | null;
}
