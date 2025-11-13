const reportTreeError  = require('../../src/controllers/moderations/reportTreeError').reportTreeError;
const Moderation = require('../../src/models/moderationModel');

jest.mock('../../src/models/moderationModel', () => ({
  create: jest.fn(),
}));

describe('reportTreeError controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      tree: { id: 1, city_id: 10 },
      user: { id: 5 },
      body: { error_comment: 'Informação errada sobre a árvore' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Moderation.create.mockClear();
  });

  it('deve criar um novo relatório de erro e retornar 201', async () => {
   
    Moderation.create.mockResolvedValue({
      id: 4,
      error_comment: 'Informação errada sobre a árvore' ,
      user_id: 5,
      tree_id: 1,
      city_id: 10,
    });

    await reportTreeError(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Moderação reportada com sucesso.',
      moderation:{
      id: 4,
      error_comment: 'Informação errada sobre a árvore' ,
      user_id: 5,
      tree_id: 1,
      city_id: 10,
    },
    });
  });

  it(' deve retornar 500 se disparar um erro', async () => {
    Moderation.create.mockRejectedValue(new Error('Erro'));

    await reportTreeError(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao reportar problema encontrado na árvore.'
    });
  });
});
