const Photo = require("../../models/photoModel");
const Tree = require("../../models/treeModel");

const sendPhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tree_id, photo_description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Nenhuma imagem enviada." });
    }

    const url = `/tree_uploads/${req.file.filename}`;

    const newPhoto = await Photo.create({
      url,
      tree_id,
      user_id: userId,
      photo_description: photo_description,
    });

    res
      .status(201)
      .json({ message: "Foto salva com sucesso!", photo: newPhoto });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao enviar foto."});
  }
};

module.exports = { sendPhoto };
