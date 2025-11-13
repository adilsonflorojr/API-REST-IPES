const checkUniqueUserFieldsForUpdate = require("../../src/middlewares/user/checkUniqueUserFieldsForUpdate");
const User = require("../../src/models/userModel");

jest.mock("../../src/models/userModel", () => ({
  findOne: jest.fn(),
}));

describe("Middleware checkUniqueUserFieldsForUpdate", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {},
      params: { id: "1" }, 
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    User.findOne.mockClear();
  });

  it("deve chamar next() se não houver email nem username no body", async () => {
    req.body = {};
    await checkUniqueUserFieldsForUpdate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it("deve retornar erro 400 se email já estiver em uso por outro usuário", async () => {
    req.body = { email: "tal@tal.com" };
    User.findOne.mockResolvedValue({ id: 2, email: "tal@tal.com", });

    await checkUniqueUserFieldsForUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email já está em uso." });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar erro 400 se username já estiver em uso por outro usuário", async () => {
    req.body = { username: "tal" };
    User.findOne.mockResolvedValue({ id: 2, username: "tal" });

    await checkUniqueUserFieldsForUpdate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Esse nome de usuario já está em uso.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() se email existir mas pertencer ao mesmo usuário", async () => {
    req.body = { email: "tal@tal.com" };
    User.findOne.mockResolvedValue({ id: 1, email: "tal@tal.com" });

    await checkUniqueUserFieldsForUpdate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve chamar next() se username existir mas pertencer ao mesmo usuário", async () => {
    req.body = { username: "tal" };
    User.findOne.mockResolvedValue({ id: 1, username: "tal" });

    await checkUniqueUserFieldsForUpdate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve chamar next() se email e username não estiverem em uso", async () => {
    req.body = { email: "tal@tal.com", username: "tal" };
    User.findOne.mockResolvedValue(null); 

    await checkUniqueUserFieldsForUpdate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
