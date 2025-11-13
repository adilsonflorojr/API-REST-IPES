const loadPhoto = require('../../src/middlewares/photo/loadPhoto');
const Photo = require('../../src/models/photoModel');

jest.mock('../../src/models/photoModel', () => ({
  findOne: jest.fn(), 
}));

describe('loadPhoto middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  it('deve atribuir a foto ao req e chamar next se foto existir', async () => {
   
    Photo.findOne.mockResolvedValue({ id: 1, url: '/img1.jpg', tree_id: 1, tree: { id: 1 } }); 

    await loadPhoto(req, res, next);

    expect(req.photo).toEqual({ id: 1, url: '/img1.jpg', tree_id: 1, tree: { id: 1 } });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve retornar 404 se a foto não for encontrada', async () => {
    Photo.findOne.mockResolvedValue(null); 

    await loadPhoto(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Foto não encontrada.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 500 se disparar algum erro', async () => {
    Photo.findOne.mockRejectedValue(new Error('Erro'));

    await loadPhoto(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao carregar a foto.',

    });
    expect(next).not.toHaveBeenCalled();
  });
});
