const changeModerationStatus = async (req, res) => {
    try {
    const status_marking  = req.body.status_marking;
    const moderation = req.moderation;

    moderation.status_marking = status_marking;
    await moderation.save();

    return res.status(200).json({
      message: "Status da moderação atualizado com sucesso.",
      moderation,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro no servidor ao atualizar status da moderação." });
  }
};

module.exports = { changeModerationStatus };
