const checkUserExistsByUsername = require("../../src/middlewares/user/checkUserExistsByUsername");
const User = require("../../src/models/userModel");

jest.mock("../../src/models/userModel", () => ({
  findOne: jest.fn(),
}));

describe("Middleware checkUserExistsByUsername", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        username: "PessoaTal",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    User.findOne.mockClear();
  });

  it("deve retornar 400 se username não foi enviado", async () => {
    req.body.username = undefined;
    await checkUserExistsByUsername(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome de usuario é obrigatório.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 404 se usuario não foi encontrado", async () => {
    User.findOne.mockResolvedValue(null);
    await checkUserExistsByUsername(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado." });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() e setar req.user se username existe", async () => {
    User.findOne.mockResolvedValue( {username: "nomeTal" });
    await checkUserExistsByUsername(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(req.user).toEqual( {  username: "nomeTal" });
    expect(next).toHaveBeenCalled();
  });

  it("deve retornar 500 se ocorrer erro interno", async () => {
    User.findOne.mockRejectedValue(new Error("Erro"));
    await checkUserExistsByUsername(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error:  "Erro interno do servidor.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
