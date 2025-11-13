const checkAdminCityRestriction = require("../../src/middlewares/city/checkAdminCityRestriction");

describe("Middleware checkAdminCityRestriction", () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("deve retornar 403 se o usuário não tiver city_id", () => {
    req.user.city_id = null; 

    checkAdminCityRestriction(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Usuário não tem cidade associada e não pode criar árvores."
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next se o usuário tiver city_id", () => {
    req.user.city_id = 10;

    checkAdminCityRestriction(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
