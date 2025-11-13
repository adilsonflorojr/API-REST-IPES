const  changeModerationStatus  = require('../../src/controllers/moderations/changeModerationStatus').changeModerationStatus

describe('Controller changeModerationStatus ', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { status_marking: 'Corrigido' },
      moderation: {
        status_marking: 'pendente',
        save: jest.fn().mockResolvedValue(), 
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('deve atualizar o status da moderação e retornar 200', async () => {
    await changeModerationStatus(req, res);

    expect(req.moderation.status_marking).toEqual('Corrigido');
    expect(req.moderation.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Status da moderação atualizado com sucesso.',
      moderation: req.moderation,
    });
  });

  it('deve retornar 500 se disparar um erro', async () => {
    req.moderation.save.mockRejectedValue(new Error('Erro'));

    await changeModerationStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro no servidor ao atualizar status da moderação.',
    });
  });
});
