const authorizeTreeOwnerOrAdminDelete = require('../../src/middlewares/tree/authorizeTreeOwnerOrAdminDelete');

describe('Middleware authorizeTreeOwnerOrAdminDelete', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 1, isAdmin: false },
      tree: { user_id: 1 }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  it('deve chamar next se o usuário for dono da árvore', async () => {

    await authorizeTreeOwnerOrAdminDelete(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve chamar next se o usuário for admin', async () => {
    req.user.isAdmin = true;
    req.tree.user_id = 2; 

    await authorizeTreeOwnerOrAdminDelete(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve retornar 403 se o usuário não for dono nem admin', async () => {
    req.user.isAdmin = false;
    req.tree.user_id = 2; 

    await authorizeTreeOwnerOrAdminDelete(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Acesso negado. Você só pode deletar árvores que cadastrou.'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 500 se um erro for disparado', async () => {
    req.tree = null;

    await authorizeTreeOwnerOrAdminDelete(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao verificar propriedade da árvore.'
    });
    expect(next).not.toHaveBeenCalled();
  });
});
