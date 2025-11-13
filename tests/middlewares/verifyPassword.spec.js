const verifyPassword = require("../../src/middlewares/auth/verifyPassword");
const bcrypt = require("bcrypt");

jest.mock("bcrypt");

describe("Middleware verifyPassword", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        password: "teste123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    bcrypt.compare.mockClear();
  });

  it("deve retornar 401 se a senha estiver incorreta", async () => {
    req.user = {
      id: 1,
      password: "senhaHashErrada",
    };

    bcrypt.compare.mockResolvedValue(false); 

    await verifyPassword(req, res, next);

   
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Senha incorreta" });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve disparar next() se a senha estiver correta", async () => {
    req.user = {
      id: 1,
      password: "senhaHashCorreta",
    };

    bcrypt.compare.mockResolvedValue(true); 

    await verifyPassword(req, res, next);

  
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 500 se bcrypt lançar um erro", async () => {
    req.user = {
      id: 1,
      password: "senhaHash",
    };

    bcrypt.compare.mockRejectedValue(new Error("Erro"));

    await verifyPassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao verificar senha." });
    expect(next).not.toHaveBeenCalled();
  });
});
