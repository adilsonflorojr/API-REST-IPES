const preventBlockingSelf = require('../../src/middlewares/block/preventBlockingSelf');
const User = require('../../src/models/userModel');

jest.mock('../../src/models/userModel', () => ({
  findByPk: jest.fn(),
}));

describe('Middleware preventBlockingSelf', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      params: {   }, 
      user: {  id: 1 },   
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    User.findByPk.mockClear();
  });

  it('deve retornar 404 se usuário alvo não existir', async () => {
    User.findByPk.mockResolvedValue(null);

    await preventBlockingSelf(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário alvo não encontrado." });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 403 se usuário tentar bloquear a si mesmo', async () => {
    
    User.findByPk.mockResolvedValue({ id: 1 });

    await preventBlockingSelf(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Você não pode bloquear a si mesmo." });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve chamar next() e setar req.targetUser se bloquear outro usuário', async () => {
    
    User.findByPk.mockResolvedValue({ id: 2 });

    await preventBlockingSelf(req, res, next);

    expect(req.targetUser).toEqual({ id: 2});
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve retornar 500 se ocorrer um erro inesperado', async () => {
    User.findByPk.mockRejectedValue(new Error('Erro'));

    await preventBlockingSelf(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao verificar status do usuário alvo.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
