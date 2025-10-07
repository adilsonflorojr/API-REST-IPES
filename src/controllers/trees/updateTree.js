const updateTree = async (req, res) => {

  try {
    const tree = req.tree;

    const updatableFields = [
      'coordinates',
      'street',
      'reference_point',
      'flower_color',
      'tree_size',
      'age',
      'comment',
    ];

    let hasChanged = false;
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        tree[field] = req.body[field];
        hasChanged = true;
      }
    });

    if (!hasChanged) {
      return res.status(400).json({ error: 'Nenhuma informação enviada para atualização.' });
    }

    await tree.save();

    return res.status(200).json({ message: 'Árvore atualizada com sucesso.', tree });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao atualizar árvore.' });
  }
};

module.exports = { updateTree };
