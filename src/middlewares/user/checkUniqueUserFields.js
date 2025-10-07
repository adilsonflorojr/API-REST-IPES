const User = require('../../models/userModel');

const checkUniqueUserFields = async (req, res, next) => {
  const { email, username } = req.body;

  const [emailExists, usernameExists] = await Promise.all([
    User.findOne({ where: { email } }),
    User.findOne({ where: { username } }),
  ]);

  if (emailExists) {
    return res.status(400).json({ error: 'Email já está em uso.' });
  }

  if (usernameExists) {
    return res.status(400).json({ error: 'Esse nome de usuario já está em uso.' });
  }

  next();
};

module.exports = checkUniqueUserFields;
