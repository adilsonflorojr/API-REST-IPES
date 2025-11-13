const findModeration = require("../../src/middlewares/moderation/findModeration");
const Moderation = require("../../src/models/moderationModel");

jest.mock("../../src/models/moderationModel"); 

describe("Middleware findModeration ", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { id: 1 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  it("deve encontrar moderação, setar req.moderation e chamar next() ", async () => {
    Moderation.findOne.mockResolvedValue({ id: 1, status_marking: 'pendente',  });

    await findModeration(req, res, next);

    expect(req.moderation).toEqual({ id: 1, status_marking: 'pendente',  });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("deve retornar 404 se não encontrar moderação", async () => {
    Moderation.findOne.mockResolvedValue(null);

    await findModeration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Registro de moderação não encontrado.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 500 em caso de erro no banco", async () => {
    Moderation.findOne.mockRejectedValue(new Error("Erro"));

    await findModeration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro no servidor ao buscar moderação.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
