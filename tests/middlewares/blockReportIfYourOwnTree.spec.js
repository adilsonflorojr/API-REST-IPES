const blockReportIfYourOwnTree = require("../../src/middlewares/block/blockReportIfYourOwnTree");

describe("Middleware blockReportIfYourOwnTree ", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 1 },
      tree: { user_id: 2 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve bloquear se o usuário for dono da árvore", () => {
    req.tree.user_id = 1;

    blockReportIfYourOwnTree(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Você não pode reportar erro na própria árvore.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve permitir se o usuário não for dono da árvore", () => {
    req.tree.user_id = 2;

    blockReportIfYourOwnTree(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 500 em caso de erro inesperado", () => {
    req.tree = null;

    blockReportIfYourOwnTree(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao validar permissão de reportar erro na árvore.",
    });

    expect(next).not.toHaveBeenCalled();
  });
});
