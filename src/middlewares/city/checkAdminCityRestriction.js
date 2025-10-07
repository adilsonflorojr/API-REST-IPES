const checkAdminCityRestriction = (req, res, next) => {
  const user = req.user;

  if (!user.city_id) {
    return res.status(403).json({
      error: "Usuário não tem cidade associada e não pode criar árvores."
    });
  }

  next();
};

module.exports = checkAdminCityRestriction ;
