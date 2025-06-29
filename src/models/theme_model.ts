import db from '../config/PrimaryDbConfigs';

interface Theme {
    theme_id: number;
    theme_title: string;
    theme_description: string;
}

interface CreateThemeInput {
    themeTitle: string;
    themeDescription: string;
}

interface GetThemeInput {
    themeId: number;
}

interface ServiceResponse<T> {
    data?: T;
    error?: string;
}

export const create = async (
    data: CreateThemeInput
): Promise<ServiceResponse<Theme>> => {
    const {themeTitle, themeDescription} = data;

    try {
        const result = await db.query<Theme>(
            `INSERT INTO ceyora_db.t1_theme (theme_title, theme_description)
             VALUES ($1, $2)
             RETURNING *`,
            [themeTitle, themeDescription]
        );

        return {data: result.rows[0]};

    } catch (err: any) {
        console.error('Error creating theme:', err.message);
        return {error: 'Internal server error'};
    }
};

export const get = async (
    data: GetThemeInput
): Promise<ServiceResponse<Theme>> => {
    const {themeId} = data;

    try {
        const result = await db.query<Theme>(
            `SELECT *
             FROM ceyora_db.t1_theme
             WHERE theme_id = $1`,
            [themeId]
        );

        if (result.rows.length === 0) {
            return {error: 'Theme not found'};
        }

        return {data: result.rows[0]};

    } catch (err: any) {
        console.error('Error fetching theme:', err.message);
        return {error: 'Internal server error'};
    }
};

export const getAllThemes = async (): Promise<ServiceResponse<Theme[]>> => {
    try {
        const result = await db.query<Theme>(
            `SELECT *
             FROM ceyora_db.t1_theme`,
        );

        if (result.rows.length === 0) {
            return {error: 'Themes not found'};
        }

        return {data: result.rows};

    } catch (err: any) {
        console.error('Error fetching theme:', err.message);
        return {error: 'Internal server error'};
    }
};
