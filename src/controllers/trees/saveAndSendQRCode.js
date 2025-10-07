const saveAndSendQRCode = async (req, res) => {
  try {
   
    req.tree.qr_code_url = `/qrcode/${req.qrFileName}`;
    await req.tree.save();

   
    res.status(200).json({
      message: 'QR Code gerado com sucesso.',
      qrcode_url: req.tree.qr_code_url
    });
  } catch (err) {
    res.status(500).json({ 
       error: 'Erro ao salvar e enviar QR Code.'
    });
  }
};

module.exports = { saveAndSendQRCode };
