const db = require('../../../config/database');

const OpinionModel = {
    getAll: async () => {
        const query = {
            text: `
            SELECT * FROM opinions_home
            ORDER BY id_opinion
            `
        }
        const { rows } = await db.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = 'SELECT * FROM opinions_home WHERE id_opinion = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    create: async ({ image_person, name_person, description_opinion }) => {
        const query = {
            text: `
            INSERT INTO opinions_home (image_person, name_person, description_opinion)
            VALUES ($1, $2, $3) RETURNING *
            `,
            values: [image_person, name_person, description_opinion]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    update: async (id_opinion, { image_person, name_person, description_opinion }) => {
        const query = {
            text: `
            UPDATE opinions_home
            SET image_person = $1, name_person = $2, description_opinion = $3
            WHERE id_opinion = $4 RETURNING *
            `,
            values: [image_person, name_person, description_opinion, id_opinion]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM opinions_home WHERE id_opinion = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },
};

module.exports = OpinionModel;
