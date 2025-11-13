const filterTree  = require("../../src/controllers/trees/filterTree").filterTrees;
const Tree = require("../../src/models/treeModel");

jest.mock("../../src/models/treeModel", () => ({
  findAndCountAll: jest.fn(),
}));

describe("Controller filterTrees", () => {
  let req, res;

  beforeEach(() => {
    req = {
      filters: {},
      pagination: {
        limit: 10,
        offset: 0,
        page: 1,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve retornar 200 e os dados das árvores corretamente", async () => {
    Tree.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        { id: 1, street: "rua tal" },
        { id: 2, street: "rua tal2" },
      ],
    });

    await filterTree(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      allTrees: [
        { id: 1, street: "rua tal" },
        { id: 2, street: "rua tal2" },
      ],
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Tree.findAndCountAll.mockRejectedValue(new Error("Erro"));

    await filterTree(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar as árvores",
    });
  });
});
