const incrementTreeViewCount = async (req, res, next) => {
  const tree = req.tree;

  try {
    if (tree) {
      tree.view_count = tree.view_count + 1;
      await tree.save();
    }
    next();
  } catch (err) {
    
    return res.status(500).json({
      error: 'Erro ao incrementar visualização da árvore.',
    });
  }
};

module.exports = incrementTreeViewCount;
