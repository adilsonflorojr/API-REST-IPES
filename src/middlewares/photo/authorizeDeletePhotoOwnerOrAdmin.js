const authorizeDeletePhotoOwnerOrAdmin= async (req, res, next) => {
    
    try {
        const photo = req.photo;
        const userId = req.user.id;
        if(req.user.isAdmin){
            next()
        }
        if (photo.user_id !== userId || photo.tree.user_id !== userId) { 
            return res.status(403).json({ error: 'Você não tem permissão para excluir esta foto.' });
        }
        next()
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar foto.'});
    }
};
module.exports =  authorizeDeletePhotoOwnerOrAdmin ;