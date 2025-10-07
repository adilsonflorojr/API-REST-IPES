const BlockModel = require('../../models/blockModel');

const deleteBlock = async (req, res) => {
  const blockId =  req.params.id;
  try {
    const block = await BlockModel.findByPk(blockId);
    if (!block) {
      return res.status(404).json({ error: 'Bloqueio não encontrado.' });
    }

   if (block.user_id != req.user.id) { 
      return res.status(403).json({ error: 'Você só pode deletar seus próprios bloqueios.' });
    }

    await BlockModel.destroy({ where: { id: blockId }}); 
  
    return res.status(200).json({ message: 'Bloqueio deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar bloqueio.'});
  }
};

module.exports = { deleteBlock };
