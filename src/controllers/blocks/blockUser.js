const Block = require("../../models/blockModel");

const blockUser = async (req, res) => {
  try {
    const blockerId = req.user.id;
    const blockedUserId = req.params.id;
    const { block_reason } = req.body;

    const newBlock = await Block.create({
      user_id: blockerId,
      blocked_user_id: blockedUserId,
      block_reason: block_reason,
      block_date: new Date(),
    });

    res
      .status(200)
      .json({ message: "Usuario bloqueado com sucesso", newBlock });

  } catch (error) {
    res
      .status(500)
      .json({error: "Erro ao bloquear usuário."});
  }
};

module.exports = { blockUser };
