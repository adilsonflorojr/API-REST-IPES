const getTreesByUserCity = (req, res) => {
  try {
    const trees = req.treesFiltered;

    
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
