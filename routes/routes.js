const express = require("express");
const router = express.Router();
const { authMiddleware, restrictTo } = require("../middleware/authMiddleware");
const { register, login } = require("../controllers/authController");
const {
  getSkema,
  getIdSkema,
  storeSkema,
  updateSkema,
  deleteSkema,
} = require("../controllers/skemaController");
const {
  getUnits,
  getUnitById,
  storeUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/unitController");
const {
  getAllElemen,
  getElemenById,
  storeElemen,
  editElemen,
  deleteElemen,
} = require("../controllers/elemenController");
const {
  getAllKUKs,
  createKUK,
  updateKUK,
  deleteKUK,
} = require("../controllers/kukController");
const {
  getAllKP,
  createKP,
  getOneKP,
  updateKP,
  deleteKP,
} = require("../controllers/KelPekerjaanController");
const asesiController = require('../controllers/asesiController');
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' }); 

// Authentication routes
router.post("/register", register);
router.post("/login", login);

// Admin-only route
router.get("/admin", authMiddleware, restrictTo("admin"), (req, res) => {
  res.send("Welcome Admin");
});

// Asesor-only route
router.get("/asesor", authMiddleware, restrictTo("asesor"), (req, res) => {
  res.send("Welcome Asesor");
});

// Asesi-only route
router.get("/asesi", authMiddleware, restrictTo("asesi"), (req, res) => {
  res.send("Welcome Asesi");
});

// x1x Skema
router.get("/skema", authMiddleware, getSkema); 
router.get("/skema/:id", authMiddleware, getIdSkema); 
router.post("/skema", authMiddleware, restrictTo("admin"), storeSkema); 
router.put("/skema/:id", authMiddleware, restrictTo("admin"), updateSkema); 
router.delete("/skema/:id", authMiddleware, restrictTo("admin"), deleteSkema); 

//  Unit
router.get("/unit", authMiddleware, getUnits); 
router.get("/unit/:id", authMiddleware, getUnitById); 
router.post("/unit", authMiddleware, restrictTo("admin"), storeUnit); 
router.put("/unit/:id", authMiddleware, restrictTo("admin"), updateUnit); 
router.delete("/unit/:id", authMiddleware, restrictTo("admin"), deleteUnit); 

// Elemen
router.get("/elemen", authMiddleware, getAllElemen); 
router.get("/elemen/:id", authMiddleware, getElemenById); 
router.post("/elemen", authMiddleware, restrictTo("admin"), storeElemen);
router.put("/elemen/:id", authMiddleware, restrictTo("admin"), editElemen); 
router.delete("/elemen/:id", authMiddleware, restrictTo("admin"), deleteElemen); 

// KUK
router.get("/kuks", authMiddleware, getAllKUKs); 
router.post("/kuks", authMiddleware, restrictTo("admin"), createKUK); 
router.put("/kuks/:id", authMiddleware, restrictTo("admin"), updateKUK); 
router.delete("/kuks/:id", authMiddleware, restrictTo("admin"), deleteKUK); 

// Kelompok Pekerjaan
router.get("/kelompok-pekerjaan", authMiddleware, getAllKP);
router.post("/kelompok-pekerjaan", authMiddleware, restrictTo("admin"), createKP);
router.put("/kelompok-pekerjaan/:id", authMiddleware, restrictTo("admin"), updateKP);
router.delete("/kelompok-pekerjaan/:id", authMiddleware, restrictTo("admin"), deleteKP);

//  menu asesi 
router.get('/menu/asesi', authMiddleware, restrictTo("admin"), asesiController.getAllAsesi);
router.post('/menu/asesi', authMiddleware, restrictTo("admin"), asesiController.addAsesi); 
router.patch('/menu/asesi/keterangan/:id', authMiddleware, restrictTo("admin"), asesiController.keteranganAsesi);
router.patch('/menu/asesi/reset-password/:id', authMiddleware, restrictTo("admin"), asesiController.resetPassword);
router.patch('/menu/asesi/deactivate/:id', authMiddleware, restrictTo("admin"), asesiController.deactivateAsesi);

// import Excel
router.post('/menu/asesi/import', authMiddleware, restrictTo("admin"), upload.single('file'), asesiController.importExcel);

module.exports = router;
