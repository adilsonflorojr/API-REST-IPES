const User = require('../../models/userModel'); 
const preventBlockingSelf = async (req, res, next) => {
  const targetUserId = req.params.id;
  
  try {
    const targetUser = await User.findByPk(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ error: "Usuário alvo não encontrado." });
    }
    if (targetUser.id === req.user.id) {
      return res
        .status(403)
        .json({ error: "Você não pode bloquear a si mesmo." });
    }
    req.targetUser = targetUser;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({
         error: "Erro ao verificar status do usuário alvo."
      });
  }
};

module.exports = preventBlockingSelf;
