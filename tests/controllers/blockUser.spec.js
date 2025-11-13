const { blockUser } = require("../../src/controllers/blocks/blockUser");
const Block = require("../../src/models/blockModel");

jest.mock("../../src/models/blockModel", () => ({
  create: jest.fn(),
}));

describe("Controller blockUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      user: { id: 1 },
      params: { id: "2" },
      body: { block_reason: "Motivo tal" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Block.create.mockClear();
  });

  it("deve bloquear o usuário e retornar 200", async () => {
    Block.create.mockResolvedValue({
      id: 1,
      user_id: req.user.id,
      blocked_user_id: req.params.id,
      block_reason: "Motivo tal",
      block_date:  "29-09-2025"
    });
    await blockUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario bloqueado com sucesso",
      newBlock: {
        id: 1,
        user_id: req.user.id,
        blocked_user_id: req.params.id,
        block_reason: "Motivo tal",
        block_date: "29-09-2025"
      },
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Block.create.mockRejectedValue(new Error("Erro"));

    await blockUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao bloquear usuário.",
    });
  });
});
