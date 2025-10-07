const Moderation = require("../../models/moderationModel");

const findModeration = async (req, res, next) => {
  try {
    const moderationId = req.params.id
    const moderation = await Moderation.findOne({
      where: {
        id: moderationId,
      },
    });

    if (!moderation) {
      return res.status(404).json({ error: "Registro de moderação não encontrado." });
    }

    req.moderation = moderation;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Erro no servidor ao buscar moderação." });
  }
};

module.exports = findModeration;
