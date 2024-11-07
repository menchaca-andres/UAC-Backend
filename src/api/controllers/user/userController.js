const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/user/userModel');

const UserController = {
  register: async (req, res) => {
    try {
      const { name_user, lastname_user, email_user, password_user, role_user } = req.body;

      const user = await UserModel.getByEmail(email_user);
      if (user) {
        return res.status(409).json({ ok: false, msg: "El email ya existe" })
      }

      // Hasheo de password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password_user, salt);

      const newUser = await UserModel.create({ name_user, lastname_user, email_user, password_user: hashedPassword, role_user });

      const token = jwt.sign({ email_user: newUser.email_user },
        "palabrasecreta"
      )

      return res.status(200).json({ ok: true, token: token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email_user, password_user } = req.body

      if (!email_user || !password_user) {
        return res
          .status(400)
          .json({ error: "Missing required fields: email, password" });
      }

      const user = await UserModel.getByEmail(email_user)
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcryptjs.compare(password_user, user.password_user)

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ email_user: user.email_user },
        "palabrasecreta"
      )

      return res.json({ ok: true, msg: token})
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = UserController;