const preventBlockingAdmin = async (req, res, next) => {
 
  try {
   
    const targetUser = req.targetUser;

    if (targetUser.isAdmin) {
      return res.status(403).json({ error: 'Você não pode bloquear um administrador.' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar status do usuário alvo.'});
  }
};

module.exports = preventBlockingAdmin;
