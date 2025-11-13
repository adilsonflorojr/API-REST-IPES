const saveAndSendQRCode = require('../../src/controllers/trees/saveAndSendQRCode').saveAndSendQRCode

describe('Controller saveAndSendQRCode', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      qrFileName: 'qrcode_tree_1.png',
      tree: {
        qr_code_url: null,
        save: jest.fn().mockResolvedValue()
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('deve salvar a url e retornar status 200 com a url', async () => {
    await saveAndSendQRCode(req, res);

    expect(req.tree.qr_code_url).toEqual('/qrcode/qrcode_tree_1.png');
    expect(req.tree.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'QR Code gerado com sucesso.',
      qrcode_url: '/qrcode/qrcode_tree_1.png'
    });
  });

  it('deve retornar 500 se disparar um erro', async () => {
    req.tree.save.mockRejectedValue(new Error('Erro'));

    await saveAndSendQRCode(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao salvar e enviar QR Code.'
    });
  });
});
