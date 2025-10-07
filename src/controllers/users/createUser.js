const bcrypt = require('bcrypt');
const User = require('../../models/userModel');

const createUser = async (req, res) => {
  try {
    const { full_name, email, username, password } = req.body;
    
   const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      full_name,
      email,
      username,
      password: hashedPassword,
      city_id: req.city.id,
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

module.exports = { createUser };
