const authorizeSameCityByTreeId = require('../../src/middlewares/tree/authorizeSameCityByTreeId');

describe('Middleware authorizeSameCityByTreeId', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { city_id: 10, isAdmin: false },
      tree: { city_id: 10 }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  it('deve chamar next se o usuário for admin', async () => {
    req.user.isAdmin = true;

    await authorizeSameCityByTreeId(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve chamar next se o usuário for da mesma cidade da árvore', async () => {
    req.user.isAdmin;
    req.tree.city_id ;

    await authorizeSameCityByTreeId(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve retornar 403 se o usuário for de outra cidade', async () => {
    req.user.isAdmin;
    req.tree.city_id = 20;

    await authorizeSameCityByTreeId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Você não pode acessar árvores de outra cidade."
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 500 se algum erro for disparaod', async () => {
    req.tree = null; 

    await authorizeSameCityByTreeId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao validar cidade da árvore."
    });
    expect(next).not.toHaveBeenCalled();
  });
});
