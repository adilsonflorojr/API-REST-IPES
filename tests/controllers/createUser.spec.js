const createUser = require("../../src/controllers/users/createUser").createUser;
const User = require("../../src/models/userModel");

jest.mock("../../src/models/userModel", () => ({
  create: jest.fn(),
}));

describe("Controller createUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        full_name: "Pessoa tal ",
        email: "tal@tal.com",
        username: "Pessoatal",
        password: "password123",
      },
      city: {
        city_id: 1,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.create.mockClear();
  });

  it("deve criar um novo usuário e retornar 201", async () => {
    User.create.mockResolvedValue({
        full_name: "Pessoa tal ",
        email: "tal@tal.com",
        username: "Pessoatal",
        password: "password123",
      });

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário registrado com sucesso!",
      user:{
        full_name: "Pessoa tal ",
        email: "tal@tal.com",
        username: "Pessoatal",
        password: "password123",
      },
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    User.create.mockRejectedValue(new Error("Erro"));

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao registrar usuário.",
    });
  });
});
