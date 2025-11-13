const authorizeUpdateUser = require("../../src/middlewares/auth/authorizeUpdateUser");

describe("Middleware authorizeUpdateUser", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      params: {},
      user: { id: 1,},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("deve retornar 403 se usuário alvo do update for diferente do usuário autenticado, ou se o usuário não for admin", async () => {
    req.params.id = '2';
    req.user.isAdmin = false;
    await authorizeUpdateUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
       error: 'Acesso negado. Você só pode alterar sua própria conta.',
    });
    expect(next).not.toHaveBeenCalled();
  });
   

  it("deve chamar next() se o usuário alvo do update for igual ao usuário autenticado, ou o usuário for admin", async () => {
    req.params.id = '1';
    req.user.isAdmin = true;
    await authorizeUpdateUser(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    
    expect(next).toHaveBeenCalled();

  });  
});
