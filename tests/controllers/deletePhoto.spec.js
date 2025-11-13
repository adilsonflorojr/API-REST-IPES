const deletePhoto  = require('../../src/controllers/photos/deletePhoto').deletePhoto;
const fs = require('fs');

jest.mock('fs'); 
describe('Controller deletePhoto ', () => {
  let req, res;

  beforeEach(() => {
    req = {
      photo: {
        url: '/tree_uploads/fotoTal.jpg',
        destroy: jest.fn().mockResolvedValue(),
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('deve deletar o arquivo e a foto e retornar 200', async () => {
    fs.existsSync.mockReturnValue(true); 
    fs.unlinkSync.mockReturnValue();     
    await deletePhoto(req, res);

 
    expect(req.photo.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Foto deletada com sucesso.' });
  });

  it('deve deletar a foto mesmo se o arquivo não existir', async () => {
    fs.existsSync.mockReturnValue(false);

    await deletePhoto(req, res);

    expect(fs.existsSync).toHaveBeenCalled();
    expect(fs.unlinkSync).not.toHaveBeenCalled();
    expect(req.photo.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Foto deletada com sucesso.' });
  });

  it('deve retornar 500 se disparar um erro', async () => {
    req.photo.destroy.mockRejectedValue(new Error('Erro'));

    await deletePhoto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao deletar foto.'
    });
  });
});
