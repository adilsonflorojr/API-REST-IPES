const  getModerationsByTreeId  = require("../../src/controllers/moderations/getModerationsByTreeId").getModerationsByTreeId
const Moderation = require("../../src/models/moderationModel");
const Tree = require("../../src/models/treeModel");

jest.mock("../../src/models/moderationModel", () => ({
  findAndCountAll: jest.fn(),
}));

describe("Controller getModerationsByTreeId", () => {
  let req, res;

  beforeEach(() => {
    req = {
      tree: { id: 1 },
      pagination: { limit: 10, offset: 0, page: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve retornar 200 e os dados das moderações corretamente", async () => {
    Moderation.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        {
          error_comment: "erro tal",
          status_marking: "pendente",
          date: "11/10/2025",
          tree: { street: "Rua tal", coordinates: "[10.23,-21.31]" },
        },
        {
          error_comment: "erro taltal",
          status_marking: "pendente",
          date: "09/10/2025",
          tree: { street: "Rua tal1", coordinates: "[10.23,-22.31]" },
        },
      ],
    });

    await getModerationsByTreeId(req, res);


    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      moderations: [
         {
          error_comment: "erro tal",
          status_marking: "pendente",
          date: "11/10/2025",
          tree: { street: "Rua tal", coordinates: "[10.23,-21.31]" },
        },
        {
          error_comment: "erro taltal",
          status_marking: "pendente",
          date: "09/10/2025",
          tree: { street: "Rua tal1", coordinates: "[10.23,-22.31]" },
        },
      ],
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Moderation.findAndCountAll.mockRejectedValue(new Error("Erro"));

    await getModerationsByTreeId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar as moderações da árvore.",
    });
  });
});
