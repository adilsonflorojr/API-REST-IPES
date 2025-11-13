const validateModerationBody = require("../../src/middlewares/moderation/validateModerationBody");

describe("Middleware validateModerationBody", () => {
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
      error_comment: "usuario errou a cor das flores",
    };

    validateModerationBody(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se error_comment for inválido", () => {
    req.body = {
      error_comment: " usuario errou a cor das flores",
    };
    validateModerationBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([
          expect.stringMatching(/O comentário/),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
