const getModerationsByCity  = require('../../src/controllers/moderations/getModerationsByCity').getModerationsByCity;
const Moderation = require('../../src/models/moderationModel');
const Tree = require('../../src/models/treeModel');
const User = require('../../src/models/userModel');
const City = require('../../src/models/cityModel');


jest.mock('../../src/models/moderationModel', () => ({
  findAndCountAll: jest.fn(),
}));

describe('Controller getModerationsByCity', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: '1' },
      pagination: { limit: 10, offset: 0, page: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('deve retornar 200 e os dados das moderações corretamente', async () => {

    Moderation.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        {
          id: 1,
          tree: {
            id: 1,
            street: 'Rua tal',
            coordinates: '[10.20,-13.21]',
            city_id: 1,
            city: { id: 1, city_name: 'cidade tal1' },
            user: { id: 1, full_name: 'pessoa tal', email: 'a@tal.com' },
          },
          date: '08-02-2024',
        },
        {
          id: 2,
          tree: {
            id: 2,
            street: 'Rua tal1',
            coordinates: '[10.22,-13.21]',
            city_id: 1,
            city: { id: 1, city_name: 'cidade tal1' },
            user: { id: 2, full_name: 'pessoa tal3', email: 'a1@tal.com' },
          },
          date: '08-02-2024',
        },
      ],
    });

    await getModerationsByCity(req, res);

    

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      moderations: [
        {
          id: 1,
          tree: {
            id: 1,
            street: 'Rua tal',
            coordinates: '[10.20,-13.21]',
            city_id: 1,
            city: { id: 1, city_name: 'cidade tal1' },
            user: { id: 1, full_name: 'pessoa tal', email: 'a@tal.com' },
          },
          date: '08-02-2024',
        },
        {
          id: 2,
          tree: {
            id: 2,
            street: 'Rua tal1',
            coordinates: '[10.22,-13.21]',
            city_id: 1,
            city: { id: 1, city_name: 'cidade tal1' },
            user: { id: 2, full_name: 'pessoa tal3', email: 'a1@tal.com' },
          },
          date: '08-02-2024',
        },
      ],
    });
  });

  it('deve retornar 400 se city_id não for fornecido', async () => {
    req.params.id = undefined;

    await getModerationsByCity(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'O campo city_id é obrigatório.',
    });
  });

  it('deve retornar 500 se disparar um erro', async () => {
    Moderation.findAndCountAll.mockRejectedValue(new Error('Erro'));

    await getModerationsByCity(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Erro interno ao buscar moderações.',
    });
  });
});
