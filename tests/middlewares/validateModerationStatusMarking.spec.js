const validateModerationStatusMarking = require("../../src/middlewares/moderation/validateModerationStatusMarking");

describe("Middleware validateModerationStatusMarking", () => {
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
      status_marking: "Concluído",
    };

    validateModerationStatusMarking(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se status_marking for inválido", () => {
     req.body = {
      status_marking: "Concluído1",
    };
    validateModerationStatusMarking(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([
          expect.stringMatching(/O status/),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
