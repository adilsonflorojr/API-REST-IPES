const blockQrCodeIfUserBlocked = async (req, res, next) => {
  const tree = req.tree;
  const blocked = req.blockedUserIds;
  const blockedBy = req.blockedByUserIds;

  try {
   
    if (blocked.includes(tree.user_id) || blockedBy.includes(tree.user_id)) {
      return res.status(403).json({ error: 'Você não pode gerar QR code para árvores de usuários bloqueados.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar bloqueios para QR code.'});
  }
};

module.exports = blockQrCodeIfUserBlocked;
