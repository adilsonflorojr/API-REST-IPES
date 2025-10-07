const Tree = require("../../models/treeModel");

const filterTrees = async (req, res) => {
  try {
    const filters = req.filters;
    const { limit, offset, page } = req.pagination;

    const { count, rows } = await Tree.findAndCountAll({
      where: filters,
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    if (!rows.length) {
      return res.status(404).json({
       error: "Nenhuma árvore encontrada após aplicar filtros.",
      });
    }

    return res.status(200).json({
      total: count,
      page,
      limit,
      allTrees: rows,
    });
  } catch (error) {
    return res.status(500).json({
       error: "Erro ao buscar as árvores"
    });
  }
};

module.exports = { filterTrees };
