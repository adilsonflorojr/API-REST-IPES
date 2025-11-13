const { getAllUsers } = require("../../src/controllers/users/getAllUsers");
const User = require("../../src/models/userModel");
const City = require("../../src/models/cityModel");

jest.mock("../../src/models/userModel", () => ({
  findAndCountAll: jest.fn(),
}));
jest.mock("../../src/models/cityModel");

describe("Controller getAllUsers", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      pagination: {
        page: 1,
        limit: 10,
        offset: 0,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findAndCountAll.mockClear();
  });

  it("deve retornar 200 com array vazio se nenhum usuário for encontrado", async () => {
    User.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 0,
      page: 1,
      limit: 10,
      allUsers: [],
    });
  });

  it("deve retornar 200 com usuários encontrados", async () => {
    User.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        {
          id: 1,
          full_name: "Tal1",
          email: "tal1@tal.com",
          username: "nomeTal1",
          isAdmin: false,
          city: { city_name: "São Paulo" },
        },
        {
          id: 2,
          full_name: "Tal2",
          email: "Tal2@example.com",
          username: "Tal2",
          isAdmin: true,
          city: { city_name: "Rio de Janeiro" },
        },
      ],
    });

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      allUsers: [
        {
          id: 1,
          full_name: "Tal1",
          email: "tal1@tal.com",
          username: "nomeTal1",
          city_name: "São Paulo",
          isAdmin: false,
        },
        {
          id: 2,
          full_name: "Tal2",
          email: "Tal2@example.com",
          username: "Tal2",
          city_name: "Rio de Janeiro",
          isAdmin: true,
        },
      ],
    });
  });

  it("deve retornar city_name null se o usuário não tiver uma cidade associada", async () => {
    User.findAndCountAll.mockResolvedValue({
      count: 1,
      rows: [
        {
          id: 1,
          full_name: "Tal1",
          email: "tal1@tal.com",
          username: "nomeTal1",
          isAdmin: false,
          city: null,
        },
      ],
    });

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 1,
      page: 1,
      limit: 10,
      allUsers: [
        {
          id: 1,
          full_name: "Tal1",
          email: "tal1@tal.com",
          username: "nomeTal1",
          city_name: null,
          isAdmin: false,
        },
      ],
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    User.findAndCountAll.mockRejectedValue(new Error("Erro"));

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar usuários",
    });
  });
});
