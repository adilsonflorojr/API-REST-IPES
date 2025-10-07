const prepareTreeFilters = (req, res, next) => {
  try {
    if (!req.user.city_id) {
      req.filters = {};
    } else {
      req.filters = {
        city_id: req.user.city_id,
      };
    }

    next();
  } catch (err) {
    res.status(500).json({
       error: "Erro durante a preparação do filtro"
    });
  }
};

module.exports = prepareTreeFilters;
