const  deleteTree = require("../../src/controllers/trees/deleteTree").deleteTree;

describe("Controller deleteTree", () => {
  let req, res;

  beforeEach(() => {
    req = {
      tree: {
        destroy: jest.fn().mockResolvedValue(),
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("deve deletar a árvore e retornar 200", async () => {
    await deleteTree(req, res);

    expect(req.tree.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Árvore deletada com sucesso.",
    });
  });

  it("deve retornar 500 se disparar um erro ao deletar", async () => {
    req.tree.destroy = jest.fn().mockRejectedValue(new Error("Erro"));

    await deleteTree(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro interno ao deletar árvore.",
    });
  });
});
