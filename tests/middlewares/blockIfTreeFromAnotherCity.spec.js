const blockIfTreeFromAnotherCity = require("../../src/middlewares/block/blockIfTreeFromAnotherCity");

describe("Middleware blockIfTreeFromAnotherCity", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 1, isAdmin: false, city_id: 10 },
      tree: { id: 32, city_id: 10 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("deve chamar next se o usuário for admin", async () => {
    req.user.isAdmin = true;

    await blockIfTreeFromAnotherCity(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve chamar next se a árvore estiver na mesma cidade do usuário", async () => {
   
    await blockIfTreeFromAnotherCity(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 403 se a árvore estiver em outra cidade", async () => {
    req.tree.city_id = 20;

    await blockIfTreeFromAnotherCity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Você não tem permissão para acessar esta árvore.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 500 se algum erro for disparado", async () => {
    req.tree = null;

    await blockIfTreeFromAnotherCity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao verificar cidade da árvore.",
    });

    expect(next).not.toHaveBeenCalled();
  });
});
