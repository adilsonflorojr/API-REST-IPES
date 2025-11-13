const getUserBlocks = require("../../src/controllers/blocks/getUserBlocks").getUserBlocks;
const Block = require("../../src/models/blockModel");

jest.mock("../../src/models/blockModel", () => ({
  findAndCountAll: jest.fn(),
}));

describe("Controller getUserBlocks", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      user: { id: 1 },
      pagination: { page: 1, limit: 10, offset: 0 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Block.findAndCountAll.mockClear();
  });

  it("deve retornar 200 e os bloqueios encontrados", async () => {
    Block.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        { id: 1, user_id: 1, blocked_user_id: 2 },
        { id: 2, user_id: 1, blocked_user_id: 4 },
      ],
    });

    await getUserBlocks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      allBlocks: [
        { id: 1, user_id: 1, blocked_user_id: 2 },
        { id: 2, user_id: 1, blocked_user_id: 4 },
      ],
    });
  });

  it("deve retornar 200 e um array vazio se não houver bloqueios", async () => {
    Block.findAndCountAll.mockResolvedValue({
      count: 0,
      rows: [],
    });

    await getUserBlocks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 0,
      page: 1,
      limit: 10,
      allBlocks: [],
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Block.findAndCountAll.mockRejectedValue(new Error("Erro"));

    await getUserBlocks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar bloqueios do usuário.",
    });
  });
});
