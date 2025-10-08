const Tree = require("../../models/treeModel");
const path = require("path");
const fs = require("fs");

const verifyTreeBelongsToUser = async (req, res, next) => {
  const userId = req.user.id;
  const tree_id = req.body.tree_id;

  const tree = await Tree.findOne({ where: { id: tree_id, user_id: userId } });
  if (!tree) {
    if (req.file) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "tree_uploads",
        req.file.filename
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Erro ao deletar arquivo:", err);
        }
      });
    }

    return res
      .status(403)
      .json({
        error: "Você não pode adicionar fotos em árvores de outros usuários.",
      });
  }

  req.tree = tree;
  next();
};

module.exports = verifyTreeBelongsToUser;
