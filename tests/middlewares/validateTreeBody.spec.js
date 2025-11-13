const validateTreeBody = require("../../src/middlewares/tree/validateTreeBody");

describe("Middleware validateTreeBody", () => {
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
      reference_point: "na frente da praça tal",
      flower_color: "amarela",
      tree_size: "médio",
      age: 50,
      comment: "árvore esta bem cuidada",
    };

    validateTreeBody(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se coordinates for inválido", () => {
    req.body = {
      coordinates: [10],
      street: "rua tal",
      reference_point: "na frente da praça tal",
      flower_color: "amarela",
      tree_size: "médio",
      age: 50,
      comment: "árvore esta bem cuidada",
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
      coordinates: [10.21, -20.21],
      street: " rua tal",
      reference_point: "na frente da praça tal",
      flower_color: "amarela",
      tree_size: "médio",
      age: 50,
      comment: "árvore esta bem cuidada",
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
      coordinates: [10.21, -20.21],
      street: "rua tal",
      reference_point: "",
      flower_color: "amarela",
      tree_size: "médio",
      age: 50,
      comment: "árvore esta bem cuidada",
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
      coordinates: [10.21, -20.21],
      street: "rua tal",
      reference_point: "na frente da praça tal",
      flower_color: "",
      tree_size: "médio",
      age: 50,
      comment: "árvore esta bem cuidada",
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
      coordinates: [10.21, -20.21],
      street: "rua tal",
      reference_point: "na frente da praça tal",
      flower_color: "",
      tree_size: "",
      age: 50,
      comment: "árvore esta bem cuidada",
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
      coordinates: [10.21, -20.21],
      street: "rua tal",
      reference_point: "na frente da praça tal",
      flower_color: "",
      tree_size: "médio",
      age: "tal",
      comment: "árvore esta bem cuidada",
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
      coordinates: [10.21, -20.21],
      street: "rua tal",
      reference_point: "na frente da praça tal",
      flower_color: "",
      tree_size: "médio",
      age: 50,
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
