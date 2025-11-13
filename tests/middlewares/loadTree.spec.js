const loadTree = require('../../src/middlewares/tree/loadTree');
const Tree = require('../../src/models/treeModel');

jest.mock('../../src/models/treeModel'); 

describe('Middleware loadTree', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { id: 10 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    Tree.findByPk.mockClear(); 
  });

  it('deve chamar next e setar req.tree se a árvore existir', async () => {
   
    Tree.findByPk.mockResolvedValue( { id: 10, street: 'Rua tal' });

    await loadTree(req, res, next);

    expect(req.tree).toEqual( { id: 10, street: 'Rua tal' });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve retornar 404 se a árvore não existir', async () => {
    Tree.findByPk.mockResolvedValue(null);

    await loadTree(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Árvore não encontrada.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 500 em caso de erro', async () => {
    Tree.findByPk.mockRejectedValue(new Error('Erro'));

    await loadTree(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro ao carregar a árvore.'
    });
    expect(next).not.toHaveBeenCalled();
  });
});
