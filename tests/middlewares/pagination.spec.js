const pagination = require("../../src/middlewares/pagination/pagination");

describe("Middleware pagination", () => {
  let req, res, next;

  beforeEach(() => {
    req = { query: {} };
    res = {};
    next = jest.fn();
  });

  it("deve definir page=1 e limit=10 por padrão e next()", () => {
    pagination(req, res, next);

    expect(req.pagination).toEqual({
      page: 1,
      limit: 10,
      offset: 0,
    });
    expect(next).toHaveBeenCalled();
  });

  it("deve usar os valores passados na query e next()", () => {
    req.query = { page: "3", limit: "10" };

    pagination(req, res, next);

    expect(req.pagination).toEqual({
      page: 3,
      limit: 10,
      offset: 20, 
    });
    expect(next).toHaveBeenCalled();
  });

  it("deve lidar com valores inválidos na query e usar padrão", () => {
    req.query = { page: "a", limit: "b" };

    pagination(req, res, next);

    expect(req.pagination).toEqual({
      page: 1,
      limit: 10,
      offset: 0,
    });
    expect(next).toHaveBeenCalled();
  });
});
