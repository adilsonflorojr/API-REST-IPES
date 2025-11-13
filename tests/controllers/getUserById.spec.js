const getUserById = require("../../src/controllers/users/getUserById").getUserById;
const User = require("../../src/models/userModel");
const City = require("../../src/models/cityModel");

jest.mock("../../src/models/userModel", () => ({
  findOne: jest.fn(),
}));

jest.mock("../../src/models/cityModel", () => ({}));

describe("Controller getUserById", () => {
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

    User.findOne.mockClear();
  });

  it("deve retornar 200 se o usuário for encontrado", async () => {
    User.findOne.mockResolvedValue({
      id: 1,
      full_name: "Tal1",
      email: "tal1@tal.com",
      username: "nomeTal1",
      isAdmin: false,
      city: { city_name: "São Paulo" },
    });

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário encontrado com sucesso!",
      user: {
        id: 1,
        full_name: "Tal1",
        email: "tal1@tal.com",
        username: "nomeTal1",
        isAdmin: false,
        city_name: "São Paulo",
      },
    });
  });

  it("deve retornar cidade null se o usuário não tiver cidade associada", async () => {
    User.findOne.mockResolvedValue({
      id: 2,
      full_name: "Tal2",
      email: "tal2@tal.com",
      username: "nomeTal2",
      isAdmin: true,
      city: null,
    });

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário encontrado com sucesso!",
      user: {
        id: 2,
        full_name: "Tal2",
        email: "tal2@tal.com",
        username: "nomeTal2",
        isAdmin: true,
        city_name: null,
      },
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    User.findOne.mockRejectedValue(new Error("Erro"));

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Usuário não encontrado",
    });
  });
});
