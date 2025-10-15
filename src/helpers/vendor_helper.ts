export class VendorHelper {
    /**
     * Parses the query parameter 'themeIds' into an array of valid numbers.
     * Accepts comma-separated strings or arrays from Express query.
     */
    static parseThemeIds(input: string | string[] | undefined): number[] {
        if (!input) return [];

        if (typeof input === 'string') {
            return input
                .split(',')
                .map(id => parseInt(id.trim()))
                .filter(id => !isNaN(id));
        }

        if (Array.isArray(input)) {
            return input
                .map(id => parseInt(id))
                .filter(id => !isNaN(id));
        }

        return [];
    }
}
