const validateTreeBody = require("../../src/middlewares/tree/validateUpdateTreeBody");

describe("Middleware validateUpdateTreeBody", () => {
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
    req.body = {
      coordinates: [10.21, -20.21],
      street: "rua tal",
      comment: "árvore esta bem cuidada",
    };

    validateTreeBody(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se coordinates for inválido", () => {
    req.body = {
      coordinates: [10],
    };
    
    validateTreeBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Validação falhou",
        details: expect.arrayContaining([
          expect.stringMatching(/A coordenada/),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se street for inválido", () => {
    req.body = {
      street: " rua tal",
    };

    validateTreeBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: expect.arrayContaining([
          expect.stringMatching(/O nome da rua/),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se reference_point for inválido", () => {
    req.body = {
      reference_point: "",
    };

    validateTreeBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: expect.arrayContaining([
          expect.stringMatching(/O ponto de referência/),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se flower_color for inválido", () => {
    req.body = {
      flower_color: "",
    };

    validateTreeBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: expect.arrayContaining([
          expect.stringMatching(/A cor das flores/),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se tree_size for inválido", () => {
    req.body = {
      tree_size: "",
    };

    validateTreeBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: expect.arrayContaining([
          expect.stringMatching(/O tamanho da árvore/),
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se age for inválido", () => {
    req.body = {
      age: "tal",
    };

    validateTreeBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: expect.arrayContaining([expect.stringMatching(/A idade da árvore/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se comment for inválido", () => {
    req.body = {
      comment: "",
    };

    validateTreeBody(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: expect.arrayContaining([expect.stringMatching(/O comentário/)]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

 
});
