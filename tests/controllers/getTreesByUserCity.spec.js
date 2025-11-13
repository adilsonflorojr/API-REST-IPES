const getTreesByUserCity =
  require("../../src/controllers/trees/getTreesByUserCity").getTreesByUserCity;

describe("Controller getTreesByUserCity", () => {
  let req, res;

  beforeEach(() => {
    req = {
      treesFiltered: [],
      treesTotal: 2,
      pagination: {
        page: 1,
        limit: 10,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve retornar 200 e os dados das árvores corretamente", () => {
    req.treesFiltered = [
      { id: 1, street: "rua tal" },
      { id: 2, street: "rual tal2" },
    ];
    getTreesByUserCity(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      allTrees: [
        { id: 1, street: "rua tal" },
        { id: 2, street: "rual tal2" },
      ],
    });
  });

  it("deve retornar 500 se disparar um erro", () => {
    getTreesByUserCity(undefined, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao enviar árvores.",
    });
  });
});
