const checkUniqueUserFields  = require('../../src/middlewares/user/checkUniqueUserFields');
const User = require('../../src/models/userModel');

jest.mock('../../src/models/userModel', () => ({
  findOne: jest.fn(),
}));

describe('Middleware checkUniqueUserFields', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        email: 'teste@teste.com',
        username: 'tal',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    User.findOne.mockClear();
  });

  it('deve retornar 400 se email já existe', async () => {
    User.findOne.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce(null);     

    await checkUniqueUserFields(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email já está em uso.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 400 se username já existe', async () => {
    User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: 1 }); 

    await checkUniqueUserFields(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Esse nome de usuario já está em uso.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve chamar next() se email e username forem únicos', async () => {
    User.findOne.mockResolvedValue(null);

    await checkUniqueUserFields(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
