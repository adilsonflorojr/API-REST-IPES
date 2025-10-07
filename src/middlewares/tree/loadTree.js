const Tree = require('../../models/treeModel');

const loadTree = async (req, res, next) => {
  try {
    const treeId = req.params.id;
    const tree = await Tree.findByPk(treeId);

    if (!tree) {
      return res.status(404).json({ error: 'Árvore não encontrada.' });
    }
      
    req.tree = tree;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao carregar a árvore.'});
  }
};

module.exports = loadTree;
