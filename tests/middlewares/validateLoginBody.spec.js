const validateLoginBody = require("../../src/middlewares/user/validateLoginBody");

describe("Middleware validateLoginBody", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve chamar next() se username e password forem válidos", () => {
    req.body = {
      username: "nometal",
      password: "senha123",
    };

    validateLoginBody(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se username não for válido", () => {
    req.body = { username: "" };

    validateLoginBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([expect.stringMatching(/nome de usuário/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se password não for válido", () => {
    req.body = { password: "" };

    validateLoginBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([expect.stringMatching(/senha/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se body não for válido", () => {
    req.body = {};

    validateLoginBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validação falhou" })
    );
    expect(next).not.toHaveBeenCalled();
  });
});