const getPhotosByTreeId = require('../../src/controllers/photos/getPhotosByTreeId').getPhotosByTreeId;
const Photo = require('../../src/models/photoModel');

jest.mock('../../src/models/photoModel', () => ({
  findAndCountAll: jest.fn(),
}));

describe('Controller getPhotosByTreeId', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      tree: { id: 10 },
      pagination: { page: 1, limit: 10, offset: 0 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Photo.findAndCountAll.mockClear();
  });

  it('deve disparar 200 e retornar fotos encontradas', async () => {
    Photo.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        { id: 1, url: '/tree_uploads/img1.jpg', photo_description: 'Foto 1', record_date: '2023-01-01' },
        { id: 2, url: '/tree_uploads/img2.jpg', photo_description: 'Foto 2', record_date: '2023-01-02' },
      ],
    });

    await getPhotosByTreeId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      photos: [
        { id: 1, url: '/tree_uploads/img1.jpg', photo_description: 'Foto 1', record_date: '2023-01-01' },
        { id: 2, url: '/tree_uploads/img2.jpg', photo_description: 'Foto 2', record_date: '2023-01-02' },
      ],
    });
  });

  it('deve disparar 200 e retornar array vazio se não houver fotos', async () => {
    Photo.findAndCountAll.mockResolvedValue({
      count: 0,
      rows: [],
    });

    await getPhotosByTreeId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 0,
      page: 1,
      limit: 10,
      photos: [],
    });
  });

  it('deve disparar um erro e sretornar 500', async () => {
    Photo.findAndCountAll.mockRejectedValue(new Error('Erro'));

    await getPhotosByTreeId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao buscar fotos da árvore.',
    });
  });
});
