const loadAccessibleTrees = require("../../src/middlewares/tree/loadAccessibleTrees");
const Tree = require("../../src/models/treeModel");

jest.mock("../../src/models/treeModel", () => ({
  findAndCountAll: jest.fn(), 
}));

describe("Middleware loadAccessibleTrees", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {},
      pagination: { limit: 10, offset: 0 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("deve carregar todas as árvores se o usuário for admin", async () => {
    req.user = { isAdmin: true };

    const mockTrees = [{ id: 1 }, { id: 2 }];
    Tree.findAndCountAll.mockResolvedValue({ count: 2, rows: mockTrees });

    await loadAccessibleTrees(req, res, next);

    expect(req.trees).toEqual(mockTrees);
    expect(req.treesTotal).toEqual(2);
    expect(next).toHaveBeenCalled();
  });

  it("deve carregar apenas árvores da cidade do usuário se não for admin", async () => {
    req.user = { isAdmin: false, city_id: 5 };

    const mockTrees = [{ id: 3, city_id: 5 }];
    Tree.findAndCountAll.mockResolvedValue({ count: 1, rows: mockTrees });

    await loadAccessibleTrees(req, res, next);

    expect(req.trees).toEqual(mockTrees);
    expect(req.treesTotal).toEqual(1);
    expect(next).toHaveBeenCalled();
  });

  it("deve retornar 500 se disparar um erro", async () => {

    Tree.findAndCountAll.mockRejectedValue(new Error("erro"));

    await loadAccessibleTrees(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao carregar árvores.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
