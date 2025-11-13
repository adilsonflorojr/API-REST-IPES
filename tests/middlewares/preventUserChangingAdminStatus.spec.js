const preventUserChangingAdminStatus = require("../../src/middlewares/auth/preventUserChangingAdminStatus");


describe("Middleware preventUserChangingAdminStatus", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        
      },
      user:{

      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  
  it("deve retornar 403 se usuário não for admin e tentar alterar isAdmin", () => {
    req.user = { id: 1, isAdmin: false };
    req.body.isAdmin = true; 

    preventUserChangingAdminStatus(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Usuário comum não pode alterar status de administrador.',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() se usuário não tentar alterar isAdmin", () => {
    req.user = { id: 1, isAdmin: false };
    req.body.isAdmin = undefined; 

    preventUserChangingAdminStatus(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve chamar next() se req.user for admin", () => {
    req.user = { id: 1, isAdmin: true };

    preventUserChangingAdminStatus(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
