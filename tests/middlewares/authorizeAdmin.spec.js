const authorizeAdmin = require("../../src/middlewares/auth/authorizeAdmin");

describe("Middleware authorizeAdmin", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {user:{}};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("deve retornar 403 se req.user não existir", () => {
    req.user = undefined;

    authorizeAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Acesso restrito para administradores",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 403 se req.user existir mas não for admin", () => {
    req.user = { id: 1, isAdmin: false };

    authorizeAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Acesso restrito para administradores",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() se req.user for admin", () => {
    req.user = { id: 1, isAdmin: true };

    authorizeAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
