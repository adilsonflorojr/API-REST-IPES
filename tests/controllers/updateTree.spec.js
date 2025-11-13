const updateTree = require("../../src/controllers/trees/updateTree").updateTree;

describe("Controller updateTree", () => {
  let req, res;

  beforeEach(() => {
    req = {
      tree: {
        coordinates: "[12.32,32.23]",
        street: "rua tal",
        reference_point: "praça tal",
        flower_color: "amarelo",
        tree_size: "medio",
        age: 10,
        comment: "uma arvore",
        save: jest.fn().mockResolvedValue(),
      },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("deve atualizar os campos enviados e retornar 200", async () => {
    req.body = {
      coordinates: "[12.32,32.23]",
      street: "rua tal",
    };

    await updateTree(req, res);

    expect(req.tree.coordinates).toEqual("[12.32,32.23]");
    expect(req.tree.street).toEqual("rua tal");
    expect(req.tree.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Árvore atualizada com sucesso.",
      tree: req.tree,
    });
  });

  it("deve retornar 400 se nenhum campo foi enviado", async () => {
    req.body = {}; 

    await updateTree(req, res);

    expect(req.tree.save).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nenhuma informação enviada para atualização.",
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    req.tree.save = jest.fn().mockRejectedValue(new Error("Erro"));

    req.body = {
      coordinates: "[32.32,32.23]",
    };

    await updateTree(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro interno ao atualizar árvore.",
    });
  });
});
