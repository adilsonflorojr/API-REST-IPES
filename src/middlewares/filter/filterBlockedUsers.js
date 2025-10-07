const filterBlockedUsers = (req, res, next) => {
  try {
    const user = req.user;
    const trees = req.trees ;
    const blocked = req.blockedUserIds;
    const blockedBy = req.blockedByUserIds;;

   
    if (user.isAdmin) {
      req.treesFiltered = trees;
    } else {
      req.treesFiltered = trees.filter(tree => {
        return !blocked.includes(tree.user_id) && !blockedBy.includes(tree.user_id);
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao filtrar árvores.'});
  }
};

module.exports = filterBlockedUsers;
