const checkCityUpdateFields = require("../../src/middlewares/city/checkCityUpdateFields");

describe("Middleware checkCityUpdateFields", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve chamar next() se city_name e state não forem fornecidos", () => {
    req.body = {};
    checkCityUpdateFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se apenas city_name for fornecido", () => {
    req.body = { city_name: "São Paulo", };
    checkCityUpdateFields(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Para atualizar a cidade, envie ambos os campos: nome da cidade e o estado."
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se apenas state for fornecido", () => {
    req.body = { state: "SP" };
    checkCityUpdateFields(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Para atualizar a cidade, envie ambos os campos: nome da cidade e o estado."
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() se ambos city_name e state forem fornecidos", () => {
    req.body = { city_name: "São Paulo", state: "SP" };
    checkCityUpdateFields(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
