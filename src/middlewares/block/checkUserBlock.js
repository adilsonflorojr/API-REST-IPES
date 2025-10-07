const Block = require("../../models/blockModel")

const checkUserBlock = async (req, res, next) => {
  const blockerId = req.user.id;
  const blockedUserId = req.params.id;
 
  const alreadyExists = await Block.findOne({
    where: {
      user_id: blockerId,
      blocked_user_id: blockedUserId
    },
  });

  if (alreadyExists) {
    return res.status(400).json({ error: "Usuário já bloqueado." });
  }
  next();
};

module.exports = checkUserBlock;
