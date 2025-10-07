const  blockIfTreeFromAnotherCity = async (req, res, next) => {
  try {
    const tree = req.tree;
    const userCityId = req.user.city_id;
    const isAdmin = req.user.isAdmin;

    if (isAdmin){
      next()
    }
    if (tree.city_id !== userCityId) {
      return res.status(403).json({ error: 'Você não tem permissão para acessar esta árvore.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar cidade da árvore.' });
  }
};

module.exports =  blockIfTreeFromAnotherCity;
