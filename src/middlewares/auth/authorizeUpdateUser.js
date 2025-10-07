const authorizeUpdateUser = (req, res, next) => {
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  const targetId = req.params.id;

  if (userId.toString() === targetId || isAdmin) {
    return next();
  }

  return res.status(403).json({ error: 'Acesso negado. Você só pode alterar sua própria conta.' });
};

module.exports = authorizeUpdateUser;
