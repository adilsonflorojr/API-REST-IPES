const Block = require("../../models/blockModel");

const getUserBlocks = async (req, res) => {
  const userId = req.user.id;
  const { page, limit, offset } = req.pagination;

  try {
    const { count, rows } = await Block.findAndCountAll({
      where: { user_id: userId },
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      total: count,
      page,
      limit,
      allBlocks: rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar bloqueios do usuário." });
  }
};

module.exports = { getUserBlocks };
