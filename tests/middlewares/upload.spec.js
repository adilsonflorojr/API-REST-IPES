const path = require("path");
const { upload, getFilename, getDestination, fileFilter } = require("../../src/middlewares/upload");

describe("Middleware upload", () => {

  it("deve definir o diretorio corretamente", (done) => {
    const req = {};
    const file = {};

    getDestination(req, file, (err, destination) => {
      expect(err).toEqual(null);
      expect(destination).toEqual(path.join(__dirname, "..", "..", "src", "tree_uploads"));
      done();
    });
  });

  it("deve gerar um nome de arquivo com timestamp e nome original", (done) => {
    const req = {};
    const file = { originalname: "fotoipe1.png" };
    const before = Date.now();

    getFilename(req, file, (err, filename) => {
      expect(err).toEqual(null);
      expect(filename.endsWith("fotoipe1.png")).toBe(true);

      const [timestamp] = filename.split("__");
      expect(Number(timestamp)).toBeGreaterThanOrEqual(before);

      done();
    });
  });

  it("deve aceitar arquivos validos", (done) => {
    const req = {};
    const file = { originalname: "fotoipe2.jpg", mimetype: "image/jpeg" };

    fileFilter(req, file, (err, correct) => {
      expect(err).toEqual(null);
      expect(correct).toEqual(true);
      done();
    });
  });

  it("deve rejeitar arquivos com extensão invalida", (done) => {
    const req = {};
    const file = { originalname: "documento.pdf", mimetype: "application/pdf" };

    fileFilter(req, file, (err) => {
      expect(err.message).toEqual("Somente imagens .jpg, .jpeg, .png são permitidas!"); 
      done()
    });
  });

  it("deve rejeitar arquivos com mimetype invalido mesmo com extensão certa", (done) => {
    const req = {};
    const file = { originalname: "fotoipe3.jpg", mimetype: "application/pdf" };

    fileFilter(req, file, (err) => {
      expect(err.message).toBe("Somente imagens .jpg, .jpeg, .png são permitidas!");
      done();
    });
  });

  it("deve ter limite de tamanho de 5MB configurado no upload", () => {
    expect(upload.limits.fileSize).toEqual(5 * 1024 * 1024);
  });
});