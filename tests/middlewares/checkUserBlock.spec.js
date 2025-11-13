const checkUserBlocks = require("../../src/middlewares/block/checkUserBlock");
const Block = require("../../src/models/blockModel");

jest.mock("../../src/models/blockModel", () => ({
  findOne: jest.fn(),
}));

describe("Middleware checkUserBlocks", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      params: {},
      user:{id: 1},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    Block.findOne.mockClear();
  });

  it("deve retornar 400 se usuário alvo ja foi bloqueado", async () => {
    Block.findOne.mockResolvedValue({id:1});
   
    await checkUserBlocks(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        error: "Usuário já bloqueado.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() se o usuário alvo não era bloqueado", async () => {
    Block.findOne.mockResolvedValue(null);
    await checkUserBlocks(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();

  });  
});
