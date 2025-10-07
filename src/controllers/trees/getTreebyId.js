const getTreeById = async (req, res) => {
  const tree = req.tree;

  res.status(200).json(tree);
};

module.exports = { getTreeById };
