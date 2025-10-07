const Tree = require("../../models/treeModel");

const loadAccessibleTrees = async (req, res, next) => {
  try {
    const user = req.user;
    const { limit, offset } = req.pagination;

    const where = user.isAdmin ? {} : { city_id: user.city_id };

    const { count, rows } = await Tree.findAndCountAll({
      where: where,
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    req.trees = rows; 
    req.treesTotal = count;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao carregar árvores."});
  }
};
module.exports = loadAccessibleTrees;
