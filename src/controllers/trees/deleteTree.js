const deleteTree = async (req, res) => {
  const tree = req.tree;

  try {
    await tree.destroy();
    return res.status(200).json({ message: 'Árvore deletada com sucesso.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao deletar árvore.' });
  }
};

module.exports = { deleteTree };
