const authorizeAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito para administradores' });
  }
   
    next();
  };
  
  module.exports = authorizeAdmin;
  