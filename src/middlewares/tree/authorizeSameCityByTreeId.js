const authorizeSameCityByTreeId = async (req, res, next) => {
  const userCityId = req.user.city_id;

  try {
    
    if (req.user.isAdmin) {
      return next();
    }
    
    if (req.tree.city_id !== userCityId) { 
      return res
        .status(403)
        .json({ error: "Você não pode acessar árvores de outra cidade." });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({
        error: "Erro ao validar cidade da árvore.",
      });
  }
};

module.exports = authorizeSameCityByTreeId;
