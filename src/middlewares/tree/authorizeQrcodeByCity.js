const authorizeQrcodeByCity = async (req, res, next) => {
  const tree = req.tree;
  const userCityId = req.user.city_id;
  const isAdmin = req.user.isAdmin;

  try {
   
    if (isAdmin || tree.city_id === userCityId) {
      return next();
    }

    return res.status(403).json({ error: 'Você só pode gerar QR code para árvores da sua cidade.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao validar cidade da árvore.'});
  }
};

module.exports = authorizeQrcodeByCity;
