const filterBlockedUsers = require('../../src/middlewares/filter/filterBlockedUsers'); 

describe(' Middleware filterBlockedUsers', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      user: {id: 1},
      trees: [],
      blockedUserIds: [],
      blockedByUserIds: []
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('Deve retornar todas as árvores ipês se usuário for admin', () => {
    req.user.isAdmin = true;
    req.trees = [
      { id: 1, user_id: 10 },
      { id: 2, user_id: 20 }
    ];

    filterBlockedUsers(req, res, next);

    expect(req.treesFiltered).toEqual(req.trees);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('Deve filtrar árvores bloqueadas se for usuario comum', () => {
    req.user.isAdmin = false;
    req.trees = [
      { id: 1, user_id: 10 },
      { id: 2, user_id: 20 },
      { id: 3, user_id: 30 }
    ];
    req.blockedUserIds = [20];
    req.blockedByUserIds = [30];

    filterBlockedUsers(req, res, next);

    expect(req.treesFiltered).toEqual([
      { id: 1, user_id: 10 }
    ]);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('Deve retornar 500se disparar um erro', () => {
    req.user = null;

    filterBlockedUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao filtrar árvores.' });
    expect(next).not.toHaveBeenCalled();
  });
});
