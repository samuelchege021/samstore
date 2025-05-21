import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();
         

// ✅ Set up multer storage with improved configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
   

       cb(null, 'uploads');
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });


function checkFileTypes(file, cb) {
  const filetypes = /jpg|jpeg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPG, JPEG, PNG, PDF) are allowed"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log("image uploaded");

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Send the relative path of the uploaded file
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});

export default router;
