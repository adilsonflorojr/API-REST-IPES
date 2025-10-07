const bcrypt = require('bcrypt');
const updateUser = async (req, res) => {
  const userToUpdate = req.userToUpdate;

  try {
    const { full_name, email, username, password, isAdmin } = req.body;

    const updatableFields = ["full_name", "email", "username", "password"];
  
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        
        userToUpdate[field] = req.body[field];
      }
    });

      for (const field of updatableFields) {
      if (req.body[field] !== undefined) {
        if (field === "password") {
          userToUpdate.password = await bcrypt.hash(req.body.password, 10);
        } else {
          userToUpdate[field] = req.body[field];
        }
      }
    }
    if (req.city) {
      userToUpdate.city_id = req.city.id;
    }

    if (isAdmin !== undefined) {
      userToUpdate.isAdmin = isAdmin;
    }

    await userToUpdate.save();


    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Erro ao atualizar usuário",
  });
  }
};

module.exports = { updateUser };