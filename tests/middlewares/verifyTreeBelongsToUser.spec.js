const verifyTreeBelongsToUser = require("../../src/middlewares/tree/verifyTreeBelongsToUser");
const Tree = require("../../src/models/treeModel");
const fs = require("fs");
const path = require("path");

jest.mock("../../src/models/treeModel", () => ({
  findOne: jest.fn()
}));
jest.mock("fs");


describe("Middleware verifyTreeBelongsToUser", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
        user: { id: 1 }, 
        body: { tree_id: 10 } 
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();

    Tree.findOne.mockClear(); 
    fs.unlink.mockClear();
  });

  it("deve retornar 403 se a árvore não pertencer ao usuário", async () => {
    Tree.findOne.mockResolvedValue(null); 

    await verifyTreeBelongsToUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Você não pode adicionar fotos em árvores de outros usuários."
    });
    expect(next).not.toHaveBeenCalled();
  });
  
  
  it("deve setar req.tree se a árvore pertencer ao usuário e chamar next ", async () => {
    
    Tree.findOne.mockResolvedValue({ id: 10, user_id: 1, street: "Rua tal" });

    await verifyTreeBelongsToUser(req, res, next);

    expect(req.tree).toEqual({ id: 10, user_id: 1, street: "Rua tal" });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it("deve deletar o arquivo se a árvore não pertencer ao usuário e req.file existir", async () => {
    req.file = { filename: "foto.jpg" };
    Tree.findOne.mockResolvedValue(null);
    fs.unlink.mockImplementation((path, cb) => cb(null));

    await verifyTreeBelongsToUser(req, res, next);
    
    const expectedPath = path.join(__dirname, "..", "..", "src", "tree_uploads", "foto.jpg");
    expect(fs.unlink).toHaveBeenCalledWith(expectedPath, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Você não pode adicionar fotos em árvores de outros usuários."
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("console.errorse falhar ao deletar o arquivo", async () => {
    req.file = { filename: "foto.jpg" };
    Tree.findOne.mockResolvedValue(null);

    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    fs.unlink.mockImplementation((path, cb) => cb(new Error("Erro")));

    await verifyTreeBelongsToUser(req, res, next);

    expect(consoleSpy).toHaveBeenCalledWith("Erro ao deletar arquivo:", expect.any(Error));
    consoleSpy.mockRestore();
  });
});
