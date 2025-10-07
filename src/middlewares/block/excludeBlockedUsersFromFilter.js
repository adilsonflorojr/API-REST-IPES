const { Op } = require("sequelize");

const excludeBlockedUsersFromFilter = (req, res, next) => {
  try {
    const blockedUserIds = req.blockedUserIds ? req.blockedUserIds : [];
    const blockedByUserIds = req.blockedByUserIds ? req.blockedByUserIds : [];

    const combined = blockedUserIds.concat(blockedByUserIds);

    const set = new Set(combined);
    const allBlockedIds = [];
    set.forEach((id) => {
      allBlockedIds.push(id);
    });

    req.filters.user_id = {
      [Op.notIn]: allBlockedIds.length ? allBlockedIds : [0],
    };

    next();
  } catch (err) {
    res.status(500).json({
       error: "Erro ao aplicar filtro de usuários bloqueados"
    });
  }
};

module.exports = excludeBlockedUsersFromFilter;
