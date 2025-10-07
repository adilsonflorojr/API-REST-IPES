const User = require('../models/userModel'); 
require('dotenv').config(); 

const createInitialAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ where: {username: 'admin' } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      await User.create({
        full_name: 'Administrador',
        email: 'admin@tal.com',
        username: 'admin',
        password: hashedPassword, 
        isAdmin: true,
      });
      console.log('Admin criado com sucesso!');
    } else {
      console.log('Admin já existe.');
    }
  } catch (error) {
    console.error('Erro criando admin:', error);
  }
};

module.exports = createInitialAdmin;
