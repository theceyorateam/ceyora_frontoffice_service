// src/models/theme_model.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
): Promise<ServiceResponse<any>> => {
    try {
        const theme = await prisma.t1_theme.create({
            data: {
                theme_title: data.themeTitle,
                theme_description: data.themeDescription,
            },
        });

        return { data: theme };
    } catch (err: any) {
        console.error('Error creating theme:', err.message);
        return { error: 'Internal server error' };
    }
};

export const get = async (
    data: GetThemeInput
): Promise<ServiceResponse<any>> => {
    try {
        const theme = await prisma.t1_theme.findUnique({
            where: {
                theme_id: data.themeId,
            },
        });

        if (!theme) return { error: 'Theme not found' };
        return { data: theme };
    } catch (err: any) {
        console.error('Error fetching theme:', err.message);
        return { error: 'Internal server error' };
    }
};

export const getAllThemes = async (): Promise<ServiceResponse<any[]>> => {
    try {
        const themes = await prisma.t1_theme.findMany();

        if (themes.length === 0) return { error: 'Themes not found' };
        return { data: themes };
    } catch (err: any) {
        console.error('Error fetching themes:', err.message);
        return { error: 'Internal server error' };
    }
};
