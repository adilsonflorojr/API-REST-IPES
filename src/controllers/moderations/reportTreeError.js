const Moderation = require('../../models/moderationModel');

const reportTreeError = async (req, res) => {
  const treeId = req.tree.id;
  const userId = req.user.id;
  const tree = req.tree;
  const { error_comment } = req.body;

  try {
    
    const newModeration = await Moderation.create({
      error_comment,
      status_marking: 'pendente',
      user_id: userId,
      tree_id:  treeId,
      city_id: tree.city_id 
    });

    return res.status(201).json({ message: 'Moderação reportada com sucesso.', moderation: newModeration });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao reportar problema encontrado na árvore.' });
  }
};
module.exports = { reportTreeError };
