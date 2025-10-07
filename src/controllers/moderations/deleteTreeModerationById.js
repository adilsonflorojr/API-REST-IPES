const deleteTreeModerationById = async (req, res) => {
  try {
    await req.moderation.destroy();

    return res.status(200).json({ message: "Moderação excluida com sucesso." });
  } catch (err) {
    return res.status(500).json({
      error: "Erro ao excluir moderação.",
    });
  }
};

module.exports = { deleteTreeModerationById};
