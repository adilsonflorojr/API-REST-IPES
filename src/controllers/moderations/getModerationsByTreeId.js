const Moderation = require("../../models/moderationModel");
const Tree = require("../../models/treeModel");

const getModerationsByTreeId = async (req, res) => {
  const treeId = req.tree.id;
  const { limit, offset, page } = req.pagination;

  try {
    const { count, rows } = await Moderation.findAndCountAll({
      where: { tree_id: treeId },
      attributes: ["error_comment", "status_marking", "date"],
      include: [
        {
          model: Tree,
          as: "tree",
          attributes: ["street", "coordinates"],
        },
      ],
      limit,
      offset,
      order: [["date", "ASC"]],
    });


    return res.status(200).json({
      total: count,
      page,
      limit,
      moderations: rows,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Erro ao buscar as moderações da árvore.",
    });
  }
};

module.exports = { getModerationsByTreeId };
