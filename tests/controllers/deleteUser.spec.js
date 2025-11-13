const  deleteUser = require("../../src/controllers/users/deleteUser"). deleteUser;
const User = require("../../src/models/userModel");
const Photo = require("../../src/models/photoModel");
const Block = require("../../src/models/blockModel");
const Tree = require("../../src/models/treeModel");
const Moderation = require("../../src/models/moderationModel");

jest.mock("../../src/models/userModel", () => ({
  findByPk: jest.fn(),
  destroy: jest.fn(),
}));

jest.mock("../../src/models/photoModel", () => ({
  destroy: jest.fn(),
}));

jest.mock("../../src/models/blockModel", () => ({
  destroy: jest.fn(),
}));

jest.mock("../../src/models/treeModel", () => ({
  destroy: jest.fn(),
}));

jest.mock("../../src/models/moderationModel", () => ({
  destroy: jest.fn(),
}));

describe("Controller deleteUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: { id: "1" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

 
    User.findByPk.mockClear();
    User.destroy.mockClear();
    Photo.destroy.mockClear();
    Block.destroy.mockClear();
    Tree.destroy.mockClear();
    Moderation.destroy.mockClear();
  });

  it("deve excluir o usuário e todas informações relacionadas a este usuário em outras tabelas e retornar 200", async () => {
    User.findByPk.mockResolvedValue({ id: 1 }); 
    Photo.destroy.mockResolvedValue(3);
    Block.destroy.mockResolvedValue(3);
    Moderation.destroy.mockResolvedValue(3);
    Tree.destroy.mockResolvedValue(3);
    User.destroy.mockResolvedValue(3);

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário excluído com sucesso.' });
  });

  it("deve retornar 404 se o usuário não for encontrado", async () => {
    User.findByPk.mockResolvedValue(null);

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado.' });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    User.findByPk.mockRejectedValue(new Error("Erro"));

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao excluir o usuário.' });
  });
});
