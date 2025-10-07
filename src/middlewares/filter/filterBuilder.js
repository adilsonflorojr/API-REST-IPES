const { Op } = require("sequelize");

const filterBuilder = (req, res, next) => {
  try {
    const allowedFields = ["street", "reference_point", "flower_color", "tree_size"];
    
    
    Object.keys(req.body).forEach((field) => {
      if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: `Campo inválido: ${field}` });
      }
      req.filters[field] = { [Op.iLike]: `%${req.body[field]}%` };
    });

    
    if (!req.filters) req.filters = {};

    next();
  } catch (err) {
    res.status(500).json({
       error: "Erro durante a filtragem",
    });
  }
};

module.exports = filterBuilder;
