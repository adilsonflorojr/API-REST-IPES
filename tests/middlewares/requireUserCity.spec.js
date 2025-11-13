const requireUserCity = require("../../src/middlewares/city/requireUserCity");

describe("Middleware requireUserCity", () => {
  let req, res, next;

  beforeEach(() => {
    req = { 
        user: {} 
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve chamar next se o usuário for admin", async () => {
    req.user.isAdmin = true;

    await requireUserCity(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 403 se o usuário não tiver city_id", async () => {
    req.user.isAdmin = false;
    req.user.city_id = null;

    await requireUserCity(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Cidade do usuário não encontrada.' });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next se o usuário tiver city_id", async () => {
    req.user.isAdmin = false;
    req.user.city_id = 10;

    await requireUserCity(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
