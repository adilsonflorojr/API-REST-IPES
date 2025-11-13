const authenticate  = require('../../src/middlewares/auth/authenticate');
const User = require('../../src/models/userModel');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/userModel', () => ({
  findByPk: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));


describe('Middleware authenticate', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jwt.verify.mockClear();
    User.findByPk.mockClear();
  });

  it('deve retornar 401 se token não for fornecido', async () => {
    await authenticate(req, res, next); 

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 401 se token for inválido', async () => {
    req.headers['authorization'] = 'Bearer tokenInvalido';
    jwt.verify.mockImplementation(() => { throw new Error('Erro JWT'); }); 

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Token inválido.'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 404 se usuário não for encontrado', async () => {
    req.headers['authorization'] = 'Bearer tokenValido'; 
    jwt.verify.mockReturnValue({ id: 1 });
    User.findByPk.mockResolvedValue(null);

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve chamar next() e setar req.user se token e usuário forem válidos', async () => {
    req.headers['authorization'] = 'Bearer tokenValido';
    const mockUser = { id: 1, username: 'john' };

    jwt.verify.mockReturnValue({ id: 1 }); 
    User.findByPk.mockResolvedValue(mockUser); 
    
    await authenticate(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});