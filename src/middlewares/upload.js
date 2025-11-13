const multer = require('multer');
const path = require('path');

const getDestination = (req, file, cb) => {
  const uploadPath = path.join(__dirname, '..', 'tree_uploads');
  cb(null, uploadPath);
};

const getFilename = (req, file, cb) => {
  const nameTreeImg = Date.now() + '__' + file.originalname;
  cb(null, nameTreeImg);
};

const storage = multer.diskStorage({
  destination: getDestination,
  filename: getFilename
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpeg', '.jpg', '.png'];
  const allowedMimetypes = ['image/jpeg', 'image/png'];

  const verify_ext = allowedExtensions.includes(
    path.extname(file.originalname).toLowerCase()
  );

  const verify_mimetype = allowedMimetypes.includes(file.mimetype);

  if (verify_ext && verify_mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Somente imagens .jpg, .jpeg, .png são permitidas!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = { upload, storage, fileFilter , getFilename, getDestination};
