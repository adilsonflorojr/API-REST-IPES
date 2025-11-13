const sendPhoto = require("../../src/controllers/photos/sendPhoto").sendPhoto;
const Photo = require("../../src/models/photoModel");

jest.mock("../../src/models/photoModel", () => ({
  create: jest.fn(), 
}));

describe("Controller sendPhoto", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: 1 },
      body: { tree_id: 10, photo_description: "Foto qualquer" },
      file: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("deve retornar 400 se nenhuma imagem for enviada", async () => {
    req.file = null;

    await sendPhoto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nenhuma imagem enviada.",
    });
  });

  it("deve salvar foto e retornar 201 se sucesso", async () => {
   
    Photo.create.mockResolvedValue({
      id: 1,
      url: "/tree_uploads/imagem.jpg",
      tree_id: 10,
      user_id: 1,
      photo_description: "Foto qualquer",
    });

    await sendPhoto(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Foto salva com sucesso!",
      photo: {
      id: 1,
      url: "/tree_uploads/imagem.jpg",
      tree_id: 10,
      user_id: 1,
      photo_description: "Foto qualquer",
    },
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Photo.create.mockRejectedValue(new Error("Erro"));

    await sendPhoto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
     error: "Erro ao enviar foto."
    });
  });
});
