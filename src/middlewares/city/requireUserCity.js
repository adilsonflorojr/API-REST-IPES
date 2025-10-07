const requireUserCity = async (req, res, next) => {
  const user = req.user;

  if (user.isAdmin) {
    return next(); 
  }

  if (!user.city_id) {
    return res.status(403).json({ error: 'Cidade do usuário não encontrada.' });
  }

  next();
};

module.exports = requireUserCity;
