const  deleteTreeModerationById  = require('../../src/controllers/moderations/deleteTreeModerationById').deleteTreeModerationById;

describe('Controller deleteTreeModerationById', () => {
  let req, res;

  beforeEach(() => {
    req = {
      moderation: {
        destroy: jest.fn().mockResolvedValue(), 
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('deve excluir a moderação e retornar 200', async () => {
    await deleteTreeModerationById(req, res);

    expect(req.moderation.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Moderação excluida com sucesso.',
    });
  });

  it('deve retornar 500 se disparar um erro', async () => {
    req.moderation.destroy.mockRejectedValue(new Error('Erro'));

    await deleteTreeModerationById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao excluir moderação.',
    });
  });
});
