const Block = require('../../models/blockModel');

const filterBlockedContent = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tree = req.tree;
    const ownerId = tree.user_id;

    const blockMade = await Block.findOne({
      where: {
        user_id: userId,
        blocked_user_id: ownerId,
      }
    });

    const blockReceived = await Block.findOne({
      where: {
        user_id: ownerId,
        blocked_user_id: userId,
      }
    });

    if (blockMade || blockReceived) {
      return res.status(403).json({error: 'Você não pode visualizar este recurso devido a bloqueio.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({error: 'Erro ao verificar bloqueios.' });
  }
};

module.exports = filterBlockedContent;
