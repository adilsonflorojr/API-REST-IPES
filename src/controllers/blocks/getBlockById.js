const BlockModel = require('../../models/blockModel');

const getBlockById = async (req, res) => {
  const blockId = req.params.id;

  try {
    const block = await BlockModel.findByPk(blockId);

    if (!block) {
      return res.status(404).json({ error: 'Bloqueio não encontrado.' });
    }

    return res.status(200).json(block);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o bloqueio.'});
  }
};

module.exports = {getBlockById};
