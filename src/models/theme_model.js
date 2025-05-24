const db = require('../config/PrimaryDbConfigs')

exports.create = async (data) => {
    const {themeTitle, themeDescription} = data;

    try {

        const result = await db.query(
            `INSERT INTO ceyora_db.t1_theme
             (theme_title, theme_description)
             VALUES ($1, $2)
             RETURNING *`,
            [themeTitle, themeDescription]
        );

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error creating theme:', err.message);
        return {error: 'Internal server error'};
    }
}

exports.get = async (data) => {
    const {themeId} = data;

    try {
        const result = await db.query(
            `SELECT *
             FROM ceyora_db.t1_theme
             WHERE theme_id = $1`,
            [themeId]
        );

        if (result.rows.length === 0) {
            return {error: 'Theme not found'};
        }

        return {data: result.rows[0]};

    } catch (err) {
        console.error('Error fetching customer:', err.message);
        return {error: 'Internal server error'};
    }
}