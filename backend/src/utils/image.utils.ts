import multer from "multer";

export const uploadImage = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    const allowExt = /\.(jpg|jpeg|png)$/;
    if (file.originalname.match(allowExt)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
});
