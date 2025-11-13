const filterBuilder = require("../../src/middlewares/filter/filterBuilder");

describe("Middleware filterBuilder", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, filters: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve retornar 400 se houver campo inválido", () => {
    req.body = {
      street: "Rua tal2",
      flowerr_color: "Teste",
    };

    filterBuilder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Campo inválido: flowerr_color",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() se req.body estiver vazio", () => {
    req.body = {};
    req.filter = {};
    filterBuilder(req, res, next);

    expect(req.filters).toEqual({});
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("deve retornar 500 se disparar um erro", () => {
    req.body = null;

    filterBuilder(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro durante a filtragem",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
