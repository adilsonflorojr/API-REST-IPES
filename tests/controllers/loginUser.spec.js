const loginUser = require('../../src/controllers/users/loginUser').loginUser;
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Controller loginUser', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: {
        id: 1,
        full_name: 'Pessoa Tal',
        email: 'Tal@tal.com',
        username: 'tal',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    process.env.JWT_SECRET = 'taltaltal';
    process.env.JWT_EXPIRES_IN = '1h';

    jwt.sign.mockClear();
  });

  it('deve gerar token e retornar usuário com status 200', () => {
    const mockToken = 'token-qualquer';
    jwt.sign.mockReturnValue(mockToken);

    loginUser(req, res);

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login realizado com sucesso!',
      token: mockToken,
      user: {
        id: req.user.id,
        full_name: req.user.full_name,
        email: req.user.email,
        username: req.user.username,
      },
    });
  });
});
