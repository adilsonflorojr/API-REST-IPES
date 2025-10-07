const path = require("path");
const fs = require("fs");
const qr = require("qr-image");

const generateQrCodeImage = async (req, res, next) => {
  const treeId = req.tree.id;
  const qrData = `http://localhost:3000/ipes/${treeId}`;
  const qrFileName = `qrcode_tree_${treeId}.png`;
  const qrFolderPath = path.join(__dirname, "..", "../qrcode");
  const qrFilePath = path.join(qrFolderPath, qrFileName);

  const qrImage = qr.image(qrData, { type: "png" });
  const writeStream = fs.createWriteStream(qrFilePath);
  qrImage.pipe(writeStream);

  writeStream.on("finish", async () => {
    req.qrFileName = qrFileName;
    next();
  });

  writeStream.on("error", (err) => {
    res.status(500).json({ error: "Erro ao gerar QR Code."});
  });
};
module.exports =  generateQrCodeImage;