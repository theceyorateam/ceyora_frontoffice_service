// src/models/theme_model.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateThemeInput {
    themeTitle: string;
    themeDescription?: string;
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
        const theme = await prisma.t1Theme.create({
            data: {
                themeTitle: data.themeTitle,
                themeDescription: data.themeDescription || null,
            },
        });

        console.log('[theme_model.create] Created theme:', theme);
        return { data: theme };
    } catch (err: any) {
        console.error('[theme_model.create] Error:', err.message);
        return { error: 'Failed to create theme' };
    }
};

export const get = async (
    data: GetThemeInput
): Promise<ServiceResponse<any>> => {
    try {
        const theme = await prisma.t1Theme.findUnique({
            where: {
                themeId: data.themeId,
            },
        });

        console.log('[theme_model.get] Retrieved theme:', theme);

        if (!theme) return { error: 'Theme not found' };
        return { data: theme };
    } catch (err: any) {
        console.error('[theme_model.get] Error:', err.message);
        return { error: 'Failed to fetch theme' };
    }
};

export const getAllThemes = async (): Promise<ServiceResponse<any[]>> => {
    try {
        const themes = await prisma.t1Theme.findMany();
        console.log('[theme_model.getAllThemes] Retrieved themes:', themes);
        return { data: themes }; // always return array
    } catch (err: any) {
        console.error('[theme_model.getAllThemes] Full error:', err);
        return { error: 'Failed to fetch themes' };
    }
};

