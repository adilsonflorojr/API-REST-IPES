
const fs = require('fs');
const path = require('path');

const deletePhoto = async (req, res) => {
  try {
    const photo = req.photo;
    
    const filePath = path.join(__dirname, '..', '..', 'tree_uploads', path.basename(photo.url)); 
    
     if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); 
    }

    await photo.destroy();

    res.status(200).json({ message: 'Foto deletada com sucesso.' });

  } catch (error) {
    res.status(500).json({error: 'Erro ao deletar foto.' });
  }
};

module.exports = {deletePhoto};
