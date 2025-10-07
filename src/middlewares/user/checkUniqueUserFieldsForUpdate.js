const User = require("../../models/userModel")
const checkUniqueUserFieldsForUpdate = async (req, res, next) => {
  const { email, username } = req.body;
  const userId = req.params.id;
  if (email) {
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail && existingEmail.id.toString() !== userId) {
      return res.status(400).json({ error: "Email já está em uso." });
    }
  }
  if (username) {
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername && existingUsername.id.toString() !== userId) {
      return res
        .status(400)
        .json({ error: "Esse nome de usuario já está em uso." });
    }
  }
  next();
};
module.exports = checkUniqueUserFieldsForUpdate;
