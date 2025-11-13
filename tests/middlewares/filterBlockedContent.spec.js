const filterBlockedContent = require('../../src/middlewares/filter/filterBlockedContent');
const Block = require('../../src/models/blockModel');

jest.mock('../../src/models/blockModel'); 

describe('Middleware filterBlockedContent', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 1 },
      tree: { user_id: 2 }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();

    Block.findOne.mockClear(); 
  });

  it('deve retornar 403 se houver algum bloqueio relacionado com o usuário', async () => {
    Block.findOne
      .mockResolvedValueOnce({id:1}) 
      .mockResolvedValueOnce(null); 

    await filterBlockedContent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
     error: 'Você não pode visualizar este recurso devido a bloqueio.'
    });
    expect(next).not.toHaveBeenCalled();
  });


  it('deve chamar next se não houver bloqueios relacionadocom o usuário', async () => {
    Block.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);

    await filterBlockedContent(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve retornar 500 em caso de erro inesperado', async () => {
    Block.findOne.mockRejectedValue(new Error('Erro'));

    await filterBlockedContent(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao verificar bloqueios.'
    });
    expect(next).not.toHaveBeenCalled();
  });
});
