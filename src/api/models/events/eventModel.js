const db = require('../../../config/database');

const EventModel = {
    getAll: async () => {
        const query = {
            text: `
            SELECT * FROM events
            ORDER BY id_event
            `
        }
        const { rows } = await db.query(query);
        return rows;
    },

    getById: async (id) => {
        const query = 'SELECT * FROM events WHERE id_event = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    create: async ({ title_event, date_start, date_end, description_event }) => {
        const query = {
            text: `
            INSERT INTO events (title_event, date_start, date_end, description_event)
            VALUES ($1, $2, $3, $4) RETURNING *
            `,
            values: [title_event, date_start, date_end, description_event]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    update: async (id_event, { title_event, date_start, date_end, description_event }) => {
        const query = {
            text: `
            UPDATE events
            SET title_event = $1, date_start = $2, date_end = $3, description_event = $4
            WHERE id_event = $5 RETURNING *
            `,
            values: [title_event, date_start, date_end, description_event, id_event]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM events WHERE id_event = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },
};

module.exports = EventModel;
