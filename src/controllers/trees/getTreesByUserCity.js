const getTreesByUserCity = (req, res) => {
  try {
    const trees = req.treesFiltered;

    if (trees.length === 0) {
      return res.status(404).json({
        error: "Nenhuma árvore visível encontrada para este usuário.",
      });
    }
    return res.status(200).json({
      total: req.treesTotal,
      page: req.pagination.page,
      limit: req.pagination.limit,
      allTrees: trees,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao enviar árvores."});
  }
};

module.exports = { getTreesByUserCity };
