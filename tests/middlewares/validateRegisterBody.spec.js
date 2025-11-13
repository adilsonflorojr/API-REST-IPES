

  const validateRegisterBody = require("../../src/middlewares/user/validateRegisterBody");

describe("Middleware validateRegisterBody", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve chamar next() se o body estiver com informações corretas", () => {
    req.body = {
      full_name: "nome tal",
      email: "tal@tal.com",
      username: "pessoatal",
      password: "senha123",
      city_name: "São Paulo",
      state: "SP",
    };

    validateRegisterBody(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se full_name for inválido", () => {
    req.body = { full_name: " 123" };

    validateRegisterBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validação falhou", 
        details: expect.arrayContaining([expect.stringMatching(/nome completo/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  

  });

  it("deve retornar 400 se email for inválido", () => {
    req.body = { email: "invalido" };

    validateRegisterBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([expect.stringMatching(/email/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se username for inválido", () => {
    req.body = { username: "" };

    validateRegisterBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([expect.stringMatching(/nome de usuário/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se password for inválido", () => {
    req.body = { password: "" };

    validateRegisterBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([expect.stringMatching(/senha/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se city_name for inválido", () => {
    req.body = { city_name: "" };

    validateRegisterBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([expect.stringMatching(/nome da cidade/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se state for inválido", () => {
    req.body = { state: "" };

    validateRegisterBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([expect.stringMatching(/estado/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar erro se body estiver vazio", () => {
    req.body = {};

    validateRegisterBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validação falhou" })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
