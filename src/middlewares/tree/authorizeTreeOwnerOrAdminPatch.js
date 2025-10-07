const authorizeTreeOwnerOrAdminPatch = async (req, res, next) => {
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  const tree = req.tree;

  try {
 
    if (tree.user_id === userId || isAdmin) {
      return next();
    }

    return res.status(403).json({ error: 'Acesso negado. Você só pode alterar árvores que cadastrou.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao verificar propriedade da árvore.' });
  }
};

module.exports = authorizeTreeOwnerOrAdminPatch;
