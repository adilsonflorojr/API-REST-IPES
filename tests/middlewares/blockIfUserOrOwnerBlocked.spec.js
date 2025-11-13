const blockIfUserOrOwnerBlocked = require("../../src/middlewares/block/blockIfUserOrOwnerBlocked");

describe('Middleware blockIfUserOrOwnerBlocked ', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      blockedUserIds: [],
      blockedByUserIds: [],
      tree: { user_id: '2' },
      user: { id: 1, isAdmin: false },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('deve permitir se o usuário for admin', () => {
    req.user.isAdmin = true;

    blockIfUserOrOwnerBlocked(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled()
  });

  it('deve bloquear se o dono da árvore estiver na lista blockedUserIds', () => {
    req.blockedUserIds = ['2'];

    blockIfUserOrOwnerBlocked(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Você não tem permissão para acessar esta árvore devido a bloqueios.',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve bloquear se o dono estiver na lista blockedByUserIds', () => {
    req.blockedByUserIds = ['2'];

    blockIfUserOrOwnerBlocked(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Você não tem permissão para acessar esta árvore devido a bloqueios.',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve permitir acesso se não houver bloqueios', () => {
    req.blockedByUserIds = [];
    req.blockedUserIds = [];
    blockIfUserOrOwnerBlocked(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled()
  });
});
