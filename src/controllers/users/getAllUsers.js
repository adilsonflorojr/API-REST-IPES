const User = require('../../models/userModel');
const City = require('../../models/cityModel');

const getAllUsers = async (req, res) => {

const { page, limit, offset } = req.pagination;
  try {
    const { count, rows } = await User.findAndCountAll({
      include: {
        model: City,
        as: 'city',
        attributes: ['city_name']
      },
      limit,
      offset,
      order: [['id', 'ASC']] 
    });

   

    res.status(200).json({
     total: count,
      page,
      limit,
      allUsers: rows.map(user => ({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        city_name: user.city ? user.city.city_name : null,
        isAdmin: user.isAdmin
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

module.exports = { getAllUsers };
