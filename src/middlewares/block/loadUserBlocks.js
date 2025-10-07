const Block = require("../../models/blockModel");

const loadUserBlocks = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.isAdmin) {
      next();
    } else {
      const userId = req.user.id;
      const blocksMade = await Block.findAll({
        where: { user_id: userId },
      });

      const blocksReceived = await Block.findAll({
        where: { blocked_user_id: userId },
      });
      
      req.blockedUserIds = blocksMade.map((blocks) => blocks.blocked_user_id);
      req.blockedByUserIds = blocksReceived.map((blocks) => blocks.user_id);

      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro ao verificar bloqueios." });
  }
};

module.exports = loadUserBlocks;
