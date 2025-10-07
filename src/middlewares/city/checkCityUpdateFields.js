const checkCityUpdateFields = (req, res, next) => {
  const { city_name, state } = req.body;

  if (!city_name && !state) {
    return next();
  }
  if (!city_name || !state) {
    return res.status(400).json({
      error: "Para atualizar a cidade, envie ambos os campos: nome da cidade e o estado."
    });
  }

  next();
};

module.exports = checkCityUpdateFields;
