const blockIfUserOrOwnerBlocked= (req, res, next) => {
  const blockedUserIds = req.blockedUserIds;
  const blockedByUserIds = req.blockedByUserIds;
  const ownerId = req.tree.user_id;
  
  if(req.user.isAdmin){
    next()
  }
  if (blockedUserIds.includes(ownerId) || blockedByUserIds.includes(ownerId)) {
    return res.status(403).json({ error: 'Você não tem permissão para acessar esta árvore devido a bloqueios.' });
  }

  next();
};

module.exports = blockIfUserOrOwnerBlocked;
