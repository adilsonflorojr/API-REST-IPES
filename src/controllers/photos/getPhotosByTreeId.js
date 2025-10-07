const Photo = require('../../models/photoModel');

const getPhotosByTreeId = async (req, res) => {
  try {
    const tree = req.tree;
    const { limit, offset, page } = req.pagination; 

    const { count, rows } = await Photo.findAndCountAll({
      where: { tree_id: tree.id },
      attributes: ['id', 'url', 'photo_description', 'record_date'],
      order: [['record_date', 'ASC']],
      limit,
      offset
    });

    if (!rows.length) {
      return res.status(404).json({ error: 'Nenhuma foto encontrada para esta árvore.' });
    }

    return res.status(200).json({
      total: count,
      page,
      limit,
      photos: rows
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar fotos da árvore.'});
  }
};

module.exports = { getPhotosByTreeId };
