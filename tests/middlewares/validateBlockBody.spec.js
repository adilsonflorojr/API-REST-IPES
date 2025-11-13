const validateBlockBody = require("../../src/middlewares/block/validateBlockBody");


describe("Middleware validateBlockBody", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve chamar next() se o body estiver correto", () => {
    req.body = { block_reason: "Usuário registrando árvores que não existem" };

    validateBlockBody(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se block_reason não for válido ", () => {
    req.body = { block_reason: "" };

    validateBlockBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([
          expect.stringMatching(/motivo do bloqueio/i),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
