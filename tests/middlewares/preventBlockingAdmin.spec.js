const preventBlockingAdmin = require('../../src/middlewares/auth/preventBlockingAdmin');

describe('Middleware preventBlockingAdmin', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body:{ id: 1},
      targetUser: {}, 
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('deve retornar 403 se o usuário alvo for admin', async () => {
    req.targetUser = { id: 2, isAdmin: true };

    await preventBlockingAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Você não pode bloquear um administrador.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve chamar next() se o usuário alvo não for admin', async () => {
    req.targetUser = { id: 3, isAdmin: false };

    await preventBlockingAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve retornar 500 se disparar um erro ', async () => {
    req.targetUser = null;

    await preventBlockingAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
     error: 'Erro ao verificar status do usuário alvo.',
    });
    expect(next).not.toHaveBeenCalled();
  });
});

