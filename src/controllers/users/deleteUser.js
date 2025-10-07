const User = require('../../models/userModel');
const Photo = require('../../models/photoModel');
const Block = require('../../models/blockModel');
const Tree = require('../../models/treeModel');
const Moderation = require('../../models/moderationModel');

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await Photo.destroy({ where: { user_id: id } });
    await Block.destroy({ where: { user_id: id } });
    await Moderation.destroy({ where: { user_id: id } });
    await Tree.destroy({ where: { user_id: id } });
    await User.destroy({ where: { id: id } });
    

    return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao excluir o usuário.'});
  }
};

module.exports = { deleteUser, };