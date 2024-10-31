const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const multer = require('multer');
const path = require('path');
const router = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

const port = 9000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder penyimpanan file
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Inisialisasi multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Batas ukuran file 2 MB
  fileFilter: function (req, file, cb) {
    // Filter jenis file (hanya .pdf dan .docx)
    const fileTypes = /pdf|doc|docx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Hanya file dokumen yang diizinkan!'));
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});