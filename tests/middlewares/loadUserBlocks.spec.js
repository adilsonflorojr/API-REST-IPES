const loadUserBlocks = require("../../src/middlewares/block/loadUserBlocks");
const Block = require("../../src/models/blockModel");

jest.mock("../../src/models/blockModel"); 

describe("Middleware loadUserBlocks", () => {
  let req, res, next;

  beforeEach(() => {
    req = { 
        user: { id: 1, isAdmin: false } 
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    Block.findAll.mockReset();
  });

  it("deve chamar next se o usuário for admin", async () => {
    req.user.isAdmin = true;

    await loadUserBlocks(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("deve buscar os bloqueios relacionado ao usuário e popular req.blockedUserIds e req.blockedByUserIds e next()", async () => {
    Block.findAll
      .mockResolvedValueOnce([{ blocked_user_id: 2 }, { blocked_user_id: 3 }]) 
      .mockResolvedValueOnce([{ user_id: 4 }, { user_id: 5 }]); 

    await loadUserBlocks(req, res, next);

    expect(Block.findAll).toHaveBeenCalledTimes(2);

    expect(req.blockedUserIds).toEqual([2, 3]);
    expect(req.blockedByUserIds).toEqual([4, 5]);
    expect(next).toHaveBeenCalled();
  });

  it("deve retornar 500 se houver erro", async () => {
    Block.findAll.mockRejectedValue(new Error("Erro"));

    await loadUserBlocks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao verificar bloqueios." });
    expect(next).not.toHaveBeenCalled();
  });
});
