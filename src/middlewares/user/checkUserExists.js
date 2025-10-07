const User = require("../../models/userModel");

const checkUserExists = async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }
  req.userToUpdate = user; 
  next();
};
module.exports = checkUserExists;
