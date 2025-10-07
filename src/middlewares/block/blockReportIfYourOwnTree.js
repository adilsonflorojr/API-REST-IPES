const blockReportIfYourOwnTree = (req, res, next) => {
  try {
    const tree = req.tree;
    const userId = req.user.id;

    if (tree.user_id === userId) {
      return res
        .status(403)
        .json({ error: "Você não pode reportar erro na própria árvore." });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao validar permissão de reportar erro na árvore.",
    });
  }
};

module.exports = blockReportIfYourOwnTree;
