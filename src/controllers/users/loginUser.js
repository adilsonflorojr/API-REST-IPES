require('dotenv').config();
const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
  const user = req.user; 

  const token = jwt.sign({ id: user.id },  process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN });

  res.status(200).json({
    message: 'Login realizado com sucesso!',
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = { loginUser };