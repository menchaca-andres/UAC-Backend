const db = require('../../../config/database');

const UserModel = {
    getByEmail: async (email_user) => {
        const query = {
          text: `
          SELECT * FROM users
          WHERE email_user = $1
          `,
          values: [email_user]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },

    create: async ({ name_user, lastname_user, email_user, password_user, role_user }) => {
        const query = {
            text: `
            INSERT INTO users (name_user, lastname_user, email_user, password_user, role_user)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
            values: [name_user, lastname_user, email_user, password_user, role_user]
        }
        const { rows } = await db.query(query);
        return rows[0];
    },
};

module.exports = UserModel;
