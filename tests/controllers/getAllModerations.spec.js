const getAllModerations = require("../../src/controllers/moderations/getAllModerations").getAllModerations;
const Moderation = require("../../src/models/moderationModel");
const Tree = require("../../src/models/treeModel");
const User = require("../../src/models/userModel");
const City = require("../../src/models/cityModel");

jest.mock("../../src/models/moderationModel", () => ({
  findAndCountAll: jest.fn(),
}));

describe("Controller getAllModerations", () => {
  let req, res;

  beforeEach(() => {
    req = {
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
          id: 1,
          date: "08/10/2025",
          tree: {
            id: 1,
            street: "rua tal1",
            coordinates: "[10.21,-22.31]",
            city_id: 1,
            city: { id: 1, city_name: "cidade tal" },
            user: { id: 1, full_name: "tal tal", email: "a@etal.com" },
          },
        },
        {
          id: 2,
          date: "09/10/2025",
          tree: {
            id: 2,
            street: "rua tal2",
            coordinates: "[10.21,-22.31]",
            city_id: 1,
            city: { id: 1, city_name: "cidade tal" },
            user: { id: 2, full_name: "tal tal", email: "a@etal.com" },
          },
        },
      ],
    });

    await getAllModerations(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: 2,
      page: 1,
      limit: 10,
      moderations: [
         {
          id: 1,
          date: "08/10/2025",
          tree: {
            id: 1,
            street: "rua tal1",
            coordinates: "[10.21,-22.31]",
            city_id: 1,
            city: { id: 1, city_name: "cidade tal" },
            user: { id: 1, full_name: "tal tal", email: "a@etal.com" },
          },
        },
        {
          id: 2,
          date: "09/10/2025",
          tree: {
            id: 2,
            street: "rua tal2",
            coordinates: "[10.21,-22.31]",
            city_id: 1,
            city: { id: 1, city_name: "cidade tal" },
            user: { id: 2, full_name: "tal tal", email: "a@etal.com" },
          },
        },
      ],
    });
  });

  it("deve retornar 500 se disparar um erro", async () => {
    Moderation.findAndCountAll.mockRejectedValue(new Error("Erro"));

    await getAllModerations(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro interno ao buscar moderações.",
    });
  });
});
