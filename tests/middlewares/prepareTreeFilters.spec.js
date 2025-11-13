const prepareTreeFilters = require("../../src/middlewares/filter/prepareTreeFilters");

describe("prepareTreeFilters Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { user: {}, filter: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("Deve definir filtros vazios se city_id não existir", () => {
    req.user.city_id = null;

    prepareTreeFilters(req, res, next);

    expect(req.filters).toEqual({});
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test("Deve definir filtros com city_id se existir", () => {
    req.user.city_id = 123;

    prepareTreeFilters(req, res, next);

    expect(req.filters).toEqual({ city_id: 123 });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test("Deve retornar 500 se disparar um erro", () => {
    req.user = null;

    prepareTreeFilters(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro durante a preparação do filtro",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
