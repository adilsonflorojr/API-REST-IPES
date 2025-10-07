const City = require("../../models/cityModel");

const resolveCity = async (req, res, next) => {
  const { city_name, state } = req.body;
  if (!city_name && !state) {
    return next();
  }
  try {
    const [cityRecord, created] = await City.findOrCreate({
      where: { city_name: city_name.trim(), state: state.trim() },
    });
    req.city = cityRecord;

    next();
  } catch (err) {
    return res.status(500).json({
      error: "Erro ao processar cidade",
    });
  }
};

module.exports = resolveCity;
