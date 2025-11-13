const createTree = require("../../src/controllers/trees/createTree").createTree;
const Tree = require("../../src/models/treeModel");

jest.mock("../../src/models/treeModel", () => ({
  create: jest.fn(),
}));
describe("Controller createTree", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: 1, city_id: 10 },
      body: {
        coordinates: "[10.231,-20.123]",
        street: "Rua Teste",
        reference_point: "Perto da praça",
        flower_color: "Amarelo",
        tree_size: "Medio",
        age: 5,
        comment: "Árvore",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Tree.create.mockClear();
  });

  it("deve criar uma árvore com sucesso", async () => {
    Tree.create.mockResolvedValue({
      id: 1,
      coordinates: "[10.231,-20.123]",
      street: "Rua Teste",
      reference_point: "Perto da praça",
      flower_color: "Amarelo",
      tree_size: "Medio",
      age: 5,
      comment: "Árvore",
      view_count: 0,
      qr_code_url: null,
      user_id: req.user.id,
      city_id: req.user.city_id,
    });

    await createTree(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Árvore cadastrada com sucesso.",
      Tree: {
        id: 1,
        coordinates: "[10.231,-20.123]",
        street: "Rua Teste",
        reference_point: "Perto da praça",
        flower_color: "Amarelo",
        tree_size: "Medio",
        age: 5,
        comment: "Árvore",
        view_count: 0,
        qr_code_url: null,
        user_id: req.user.id,
        city_id: req.user.city_id,
      },
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Tree.create.mockRejectedValue(new Error("Erro"));

    await createTree(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro interno ao cadastrar árvore.",
    });
  });
});
