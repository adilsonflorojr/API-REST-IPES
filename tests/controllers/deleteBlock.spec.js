const deleteBlock = require("../../src/controllers/blocks/deleteBlock").deleteBlock;
const Block = require("../../src/models/blockModel");

jest.mock("../../src/models/blockModel", () => ({
  findByPk: jest.fn(),
  destroy: jest.fn(),
}));

describe("Controller deleteBlock", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      user: { id: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Block.findByPk.mockClear();
    Block.destroy.mockClear();
  });

  it("deve deletar o bloqueio e retornar 200", async () => {
    Block.findByPk.mockResolvedValue({
      id: 1,
      user_id: 1,
      blocked_user_id: 2,
      block_reason: "Motivo tal",
      block_date: "29-09-2025",
    });

    Block.destroy.mockResolvedValue(1);

    await deleteBlock(req, res);

    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Bloqueio deletado com sucesso.",
    });
  });

  it("deve retornar 404 se o bloqueio não for encontrado", async () => {
    Block.findByPk.mockResolvedValue(null);

    await deleteBlock(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Bloqueio não encontrado.",
    });
  });

  it("deve retornar 403 se tentar deletar bloqueio de outro usuário", async () => {
    Block.findByPk.mockResolvedValue({
      id: 1,
      user_id: 2,
      blocked_user_id: 1,
      block_reason: "Motivo tal",
      block_date: "29-09-2025",
    });

    await deleteBlock(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Você só pode deletar seus próprios bloqueios.",
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Block.findByPk.mockRejectedValue(new Error("Erro"));

    await deleteBlock(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao deletar bloqueio.",
    });
  });
});
