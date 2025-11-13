const { Op } = require("sequelize");
const excludeBlockedUsersFromFilter = require("../../src/middlewares/block/excludeBlockedUsersFromFilter");

describe("Middleware excludeBlockedUsersFromFilter", () => {
  let req, res, next;

  beforeEach(() => {
    req = { blockedUserIds: [], blockedByUserIds: [], filters: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve adicionar ao filtro, usuários bloqueados", () => {
    req.blockedUserIds = [1, 2];
    req.blockedByUserIds = [3, 4];

    excludeBlockedUsersFromFilter(req, res, next);

    expect(req.filters.user_id).toEqual({
      [Op.notIn]: [1, 2, 3, 4],
    });
    expect(next).toHaveBeenCalled();
  });

  it("deve usar [0] se não houver usuários bloqueados", () => {
    excludeBlockedUsersFromFilter(req, res, next);

    expect(req.filters.user_id).toEqual({
      [Op.notIn]: [0],
    });
    expect(next).toHaveBeenCalled();
  });
  it("Caso ambas req. sejam nulo, ", () => {
    req.blockedUserIds = null;
    req.blockedByUserIds = null;

    excludeBlockedUsersFromFilter(req, res, next);

    expect(req.filters.user_id).toEqual({
      [Op.notIn]: [0],
    });
    expect(next).toHaveBeenCalled();
  });
  it("deve retornar 500 se disparar algum erro", () => {
    req.filters = null;

    excludeBlockedUsersFromFilter(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Erro ao aplicar filtro de usuários bloqueados",
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
