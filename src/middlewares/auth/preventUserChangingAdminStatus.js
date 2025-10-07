const preventUserChangingAdminStatus = (req, res, next) => {
    if (!req.user.isAdmin && req.body.isAdmin !== undefined) {
      return res.status(403).json({ error: 'Usuário comum não pode alterar status de administrador.' });
    }
    next();
  };
  
  module.exports = preventUserChangingAdminStatus;
  