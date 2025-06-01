// utils/ResponseMessages/ResponseMessages.ts
const ResponseMessages = {
    CUSTOMER_CREATION_SUCCESS: "customer created successfully",
    CUSTOMER_RETRIEVAL_SUCCESS: "customer retrieved successfully",
    VENDOR_CREATION_SUCCESS: "vendor created successfully",
    VENDOR_RETRIEVAL_SUCCESS: "vendor retrieved successfully",
    PACKAGE_CREATION_SUCCESS: "package created successfully",
    PACKAGE_RETRIEVAL_SUCCESS: "package retrieved successfully",
    JOURNEY_CREATION_SUCCESS: "journey created successfully",
    JOURNEY_RETRIEVAL_SUCCESS: "journey retrieved successfully",
    THEME_RETRIEVAL_SUCCESS: "theme retrieval success",
    THEME_CREATION_SUCCESS: "theme creation success",
    REGION_RETRIEVAL_SUCCESS: "region retrieval success",
    REGION_CREATION_SUCCESS: "region creation success",
} as const;

export default ResponseMessages;
