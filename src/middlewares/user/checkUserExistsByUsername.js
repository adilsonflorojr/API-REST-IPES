const User = require('../../models/userModel')

const checkUserExistsByUsername = async (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Nome de usuario é obrigatório.' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = checkUserExistsByUsername;
