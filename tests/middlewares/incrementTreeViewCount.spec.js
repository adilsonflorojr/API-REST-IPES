const incrementTreeViewCount = require("../../src/middlewares/tree/incrementTreeViewCount");

describe("Middleware incrementTreeViewCount", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      tree: {
        view_count: 5,
        save: jest.fn().mockResolvedValue(true),
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    req.tree.save.mockClear();
  });

  it("deve incrementar view_count, save e chamar next", async () => {
    await incrementTreeViewCount(req, res, next);

    expect(req.tree.view_count).toEqual(6);
    expect(req.tree.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  it('deve chamar next mesmo que req.tree seja undefined', async () => {
    req.tree = undefined;

    await incrementTreeViewCount(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 500 se disparar algum erro", async () => {
    req.tree.save.mockRejectedValue(new Error("Erro"));

    await incrementTreeViewCount(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao incrementar visualização da árvore.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
