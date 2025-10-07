const Photo = require("../../models/photoModel")
const Tree = require("../../models/treeModel")

const loadPhoto = async (req, res, next) => {
  try{
    const photoId = req.params.id;

    const photo = await Photo.findOne({ where: { id: photoId }, include: { model: Tree, as: 'tree' } });
    req.photo = photo;
    
    if (!photo) {
      return res.status(404).json({error: 'Foto não encontrada.' });
    }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar a foto.'});
  }
}

module.exports =  loadPhoto;