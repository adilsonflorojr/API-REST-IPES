const Tree = require('../../models/treeModel');

const createTree = async (req, res) => {
  try {
    const user = req.user; 

    const {
      coordinates,
      street,
      reference_point,
      flower_color,
      tree_size,
      age,
      comment
    } = req.body;

     
    const newTree = await Tree.create({
      coordinates:JSON.stringify(coordinates),
      street,
      reference_point,
      flower_color,
      tree_size,
      age,
      comment,
      view_count: 0,
      qr_code_url:  null,
      user_id: user.id,        
      city_id: user.city_id     
    });
    

    return res.status(201).json({
      message: 'Árvore cadastrada com sucesso.',
      Tree: newTree
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Erro interno ao cadastrar árvore.' });
  }
};

module.exports = { createTree };
