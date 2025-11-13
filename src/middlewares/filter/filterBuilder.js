const { Op } = require("sequelize");

const filterBuilder = (req, res, next) => {
  try {
    const allowedFields = [
      "street",
      "reference_point",
      "flower_color",
      "tree_size",
    ];

    for (const field of Object.keys(req.body)) {
      if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: `Campo inválido: ${field}` });
      }
      req.filters[field] = { [Op.iLike]: `%${req.body[field]}%` };
    }
    next();
  } catch (err) {
    res.status(500).json({
      error: "Erro durante a filtragem",
    });
  }
};

module.exports = filterBuilder;
