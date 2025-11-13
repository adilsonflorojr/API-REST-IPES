const resolveCity = require("../../src/middlewares/city/resolveCity");
const City = require("../../src/models/cityModel");

jest.mock("../../src/models/cityModel", () => ({
  findOrCreate: jest.fn(),
}));

describe("Middleware resolveCity", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        city_name: "São Paulo",
        state: "SP",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    City.findOrCreate.mockClear();
  });

  it("deve chamar next() se não houver city_name nem state", async () => {
    req.body = {};  
    await resolveCity(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(City.findOrCreate).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 500 se disparar algum erro", async () => {
    City.findOrCreate.mockRejectedValue(new Error("Erro")); 
    await resolveCity(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao processar cidade' });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() e setar req.city se conseguir criar/obter a cidade", async () => {

    City.findOrCreate.mockResolvedValue([{ id: 1, city_name: "São Paulo", state: "SP" }, true]); 

    await resolveCity(req, res, next);

    expect(req.city).toEqual({ id: 1, city_name: "São Paulo", state: "SP" });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
