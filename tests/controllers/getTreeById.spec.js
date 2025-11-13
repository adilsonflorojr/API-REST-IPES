const  getTreeById = require("../../src/controllers/trees/getTreebyId").getTreeById;

describe("Controller getTreeById", () => {
  let req, res;

  beforeEach(() => {
    req = {
      tree: { id: 1, name: "Árvore tal" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve retornar 200 com a árvore", async () => {
   
    await getTreeById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(req.tree);
  });

});
