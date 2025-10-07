const bcrypt = require('bcrypt');

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  const user = req.user; 

 
  try {
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao verificar senha.' });
  }
};
module.exports = verifyPassword;
