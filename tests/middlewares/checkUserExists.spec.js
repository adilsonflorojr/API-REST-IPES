const checkUserExists= require("../../src/middlewares/user/checkUserExists");
const User = require("../../src/models/userModel");

jest.mock("../../src/models/userModel", () => ({
  findByPk: jest.fn(),
}));

describe("Middleware checkUserExistsByUsername", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    User.findByPk.mockClear();
  });

  it("deve retornar 404 se usuário for null", async () => {
    User.findByPk.mockResolvedValue(null);
    await checkUserExists(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
       error: "Usuário não encontrado.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() e setar req.userToUpdate se o usuário alvo for encontrado", async () => {
    User.findByPk.mockResolvedValue({ id: 1 });
    await checkUserExists(req, res, next);
    expect(res.status).not.toHaveBeenCalledWith();
    expect(res.json).not.toHaveBeenCalledWith();
    expect(req.userToUpdate).toEqual({ id: 1 });
    expect(next).toHaveBeenCalled();

  });
  
});
