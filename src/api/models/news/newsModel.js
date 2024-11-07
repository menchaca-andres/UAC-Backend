const db = require('../../../config/database');

const NewsModel = {
    getAll: async () => {
        const query = {
            text: `
            SELECT * FROM news
            ORDER BY id_news
            `
        }
        const { rows } = await db.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = 'SELECT * FROM news WHERE id_news = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    create: async ({ holder_news, image_news, date_news, summary_news }) => {
        const query = {
            text: `
            INSERT INTO news (holder_news, image_news, date_news, summary_news)
            VALUES ($1, $2, $3, $4) RETURNING *
            `,
            values: [holder_news, image_news, date_news, summary_news]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    update: async (id_news, { holder_news, image_news, date_news, summary_news }) => {
        const query = {
            text: `
            UPDATE news
            SET holder_news = $1, image_news = $2, date_news = $3, summary_news = $4
            WHERE id_news = $5 RETURNING *
            `,
            values: [holder_news, image_news, date_news, summary_news, id_news]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM news WHERE id_news = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },
};

module.exports = NewsModel;
