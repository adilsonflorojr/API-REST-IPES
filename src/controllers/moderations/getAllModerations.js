const Moderation = require('../../models/moderationModel');
const Tree = require('../../models/treeModel');
const User = require('../../models/userModel');
const City = require('../../models/cityModel');

const getAllModerations = async (req, res) => {
  try {
    const { limit, offset, page } = req.pagination;

    const { count, rows } = await Moderation.findAndCountAll({
      include: [
        {
          model: Tree,
          as: 'tree',
          attributes: ['id', 'street', 'coordinates', 'city_id'],
          include: [
            { model: City, as: 'city', attributes: ['id', 'city_name'] },
            { model: User, as: 'user', attributes: ['id', 'full_name', 'email'] }
          ]
        }
      ],
      order: [['date', 'ASC']],
      limit,
      offset
    });

    return res.status(200).json({
      total: count,
      page,
      limit,
      moderations: rows
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao buscar moderações.'});
  }
};

module.exports = { getAllModerations };
