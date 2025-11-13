const updateUser = require("../../src/controllers/users/updateUser").updateUser;
const bcrypt = require("bcrypt");

jest.mock("bcrypt");

describe("Controller updateUser", () => {
  let req, res, userToUpdate;

  beforeEach(() => {
    userToUpdate = {
      full_name: "Pessoa 1",
      email: "email1@tal.com",
      username: "user1",
      password: "123",
      isAdmin: false,
      city_id: null,
      save: jest.fn().mockResolvedValue(true),
    };

    req = {
      body: {},
      userToUpdate,
      city: null,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    bcrypt.hash.mockClear();
  });

  it("deve atualizar os campos permitidos e hash da senha", async () => {
    req.body = {
   
      email: "email2@tal.com",
      username: "user2",
      password: "senha2",
    };

    bcrypt.hash.mockResolvedValue("hashedSenha2");

    await updateUser(req, res);

    
    expect(userToUpdate.email).toEqual("email2@tal.com");
    expect(userToUpdate.username).toEqual("user2");
    expect(userToUpdate.password).toEqual("hashedSenha2");
    expect(userToUpdate.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário atualizado com sucesso!",
    });
  });

  it("deve atualizar city_id se req.city existir", async () => {
    req.city = { id: 42 };

    await updateUser(req, res);

    expect(userToUpdate.city_id).toEqual(42);
    expect(userToUpdate.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário atualizado com sucesso!",
    });
  });

  it("deve atualizar isAdmin se enviado no body", async () => {
    req.body = { isAdmin: true };

    await updateUser(req, res);

    expect(userToUpdate.isAdmin).toEqual(true);
    expect(userToUpdate.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário atualizado com sucesso!",
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    userToUpdate.save.mockRejectedValue(new Error("Erro"));

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao atualizar usuário",
    });
  });
});
