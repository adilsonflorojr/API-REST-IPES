const getBlockById =
  require("../../src/controllers/blocks/getBlockById").getBlockById;
const Block = require("../../src/models/blockModel");

jest.mock("../../src/models/blockModel", () => ({
  findByPk: jest.fn(),
}));

describe("Controller getBlockById", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: { id: "1" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Block.findByPk.mockClear();
  });

  it("deve retornar 200 se o bloqueio for encontrado", async () => {
    Block.findByPk.mockResolvedValue({
      id: 1,
      user_id: 1,
      blocked_user_id: 2,
      block_reason: "Motivo Tal",
      block_date: "29-09-2025",
    });

    await getBlockById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      user_id: 1,
      blocked_user_id: 2,
      block_reason: "Motivo Tal",
      block_date: "29-09-2025",
    });
  });

  it("deve retornar 404 se o bloqueio não for encontrado", async () => {
    Block.findByPk.mockResolvedValue(null);

    await getBlockById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Bloqueio não encontrado.",
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Block.findByPk.mockRejectedValue(new Error("Erro"));

    await getBlockById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar o bloqueio.",
    });
  });
});
