const User = require('../../models/userModel');
const City = require('../../models/cityModel');

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: City,
        as: 'city',
        attributes: ['city_name']
      }
    });

    res.status(200).json({
      message: 'Usuário encontrado com sucesso!',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        city_name: user.city ? user.city.city_name : null,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Usuário não encontrado'});
  }
};
module.exports = {
  getUserById,
}