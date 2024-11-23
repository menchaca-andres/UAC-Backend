const db = require('../../../config/database');

const CareerModel = {
    getAll: async () => {
        const query = {
            text: `
            SELECT * FROM careers
            ORDER BY id_career
            `
        }
        const { rows } = await db.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = 'SELECT * FROM careers WHERE id_career = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    create: async ({ name_career, image_career, description_career, duration_career, study_area, graduation_modality }) => {
        const query = {
            text: `
            INSERT INTO careers (name_career, image_career, description_career, duration_career, study_area, graduation_modality)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `,
            values: [name_career, image_career, description_career, duration_career, study_area, graduation_modality]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    update: async (id_career, { name_career, image_career, description_career, duration_career, study_area, graduation_modality }) => {
        const query = {
            text: `
            UPDATE careers
            SET name_career = $1, image_career = $2, description_career = $3, duration_career = $4, study_area = $5, graduation_modality = $6
            WHERE id_career = $7 RETURNING *
            `,
            values: [name_career, image_career, description_career, duration_career, study_area, graduation_modality, id_career]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM careers WHERE id_career = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },
};

module.exports = CareerModel;
